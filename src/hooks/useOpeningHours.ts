import { useState, useEffect } from 'react';

export interface DaySchedule {
  dayName: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, etc.
  openTime: string;
  closeTime: string;
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
  isClosed: boolean;
}

export const WEEKLY_SCHEDULE: DaySchedule[] = [
  { dayName: 'Sunday', dayIndex: 0, openTime: '', closeTime: '', openHour: 0, openMinute: 0, closeHour: 0, closeMinute: 0, isClosed: true },
  { dayName: 'Monday', dayIndex: 1, openTime: '11:00', closeTime: '20:00', openHour: 11, openMinute: 0, closeHour: 20, closeMinute: 0, isClosed: false },
  { dayName: 'Tuesday', dayIndex: 2, openTime: '11:00', closeTime: '20:00', openHour: 11, openMinute: 0, closeHour: 20, closeMinute: 0, isClosed: false },
  { dayName: 'Wednesday', dayIndex: 3, openTime: '11:00', closeTime: '20:00', openHour: 11, openMinute: 0, closeHour: 20, closeMinute: 0, isClosed: false },
  { dayName: 'Thursday', dayIndex: 4, openTime: '11:00', closeTime: '20:00', openHour: 11, openMinute: 0, closeHour: 20, closeMinute: 0, isClosed: false },
  { dayName: 'Friday', dayIndex: 5, openTime: '11:00', closeTime: '20:00', openHour: 11, openMinute: 0, closeHour: 20, closeMinute: 0, isClosed: false },
  { dayName: 'Saturday', dayIndex: 6, openTime: '09:00', closeTime: '21:00', openHour: 9, openMinute: 0, closeHour: 21, closeMinute: 0, isClosed: false },
];

export function useOpeningHours() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 30000); // refresh every 30 seconds
    return () => clearInterval(timer);
  }, []);

  // Compute UK time accurately
  const ukTimeString = now.toLocaleString('en-US', { timeZone: 'Europe/London' });
  const ukDate = new Date(ukTimeString);
  const currentDayIndex = ukDate.getDay();
  const currentHour = ukDate.getHours();
  const currentMinute = ukDate.getMinutes();
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  const todaySchedule = WEEKLY_SCHEDULE[currentDayIndex];

  let isOpen = false;
  let statusText = '';
  let nextOpenText = '';

  if (!todaySchedule.isClosed) {
    const openMinutes = todaySchedule.openHour * 60 + todaySchedule.openMinute;
    const closeMinutes = todaySchedule.closeHour * 60 + todaySchedule.closeMinute;

    if (currentTotalMinutes >= openMinutes && currentTotalMinutes < closeMinutes) {
      isOpen = true;
      statusText = `Open now · Closes ${todaySchedule.closeTime}`;
    } else if (currentTotalMinutes < openMinutes) {
      statusText = `Closed · Opens today at ${todaySchedule.openTime}`;
      nextOpenText = `Today at ${todaySchedule.openTime}`;
    } else {
      // After closing today
      const nextDayIndex = (currentDayIndex + 1) % 7;
      const nextDay = WEEKLY_SCHEDULE[nextDayIndex];
      if (!nextDay.isClosed) {
        statusText = `Closed · Opens tomorrow at ${nextDay.openTime}`;
        nextOpenText = `Tomorrow at ${nextDay.openTime}`;
      } else {
        statusText = `Closed · Opens Monday at 11:00`;
        nextOpenText = `Monday at 11:00`;
      }
    }
  } else {
    // Sunday
    statusText = `Closed today · Opens Monday at 11:00`;
    nextOpenText = `Monday at 11:00`;
  }

  // Generate pickup time options for cart
  const getPickupTimeSlots = () => {
    const slots: string[] = [];
    if (!todaySchedule.isClosed && currentTotalMinutes < (todaySchedule.closeHour * 60 - 30)) {
      // today slots
      const startMinutes = Math.max(
        todaySchedule.openHour * 60 + todaySchedule.openMinute,
        Math.ceil((currentTotalMinutes + 20) / 15) * 15 // at least 20 min preparation
      );
      const endMinutes = todaySchedule.closeHour * 60 + todaySchedule.closeMinute - 15;

      for (let m = startMinutes; m <= endMinutes; m += 15) {
        const h = Math.floor(m / 60);
        const min = m % 60;
        slots.push(`Today at ${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
      }
    }

    if (slots.length === 0) {
      // Next day slots
      const targetDay = currentDayIndex === 0 ? WEEKLY_SCHEDULE[1] : (currentDayIndex === 6 ? WEEKLY_SCHEDULE[1] : WEEKLY_SCHEDULE[currentDayIndex + 1]);
      const targetLabel = currentDayIndex === 0 || currentDayIndex === 6 ? 'Monday' : 'Tomorrow';
      for (let h = targetDay.openHour; h < targetDay.closeHour; h++) {
        slots.push(`${targetLabel} at ${h.toString().padStart(2, '0')}:00`);
        slots.push(`${targetLabel} at ${h.toString().padStart(2, '0')}:30`);
      }
    }

    return slots;
  };

  return {
    isOpen,
    statusText,
    nextOpenText,
    currentDayIndex,
    todaySchedule,
    schedule: WEEKLY_SCHEDULE,
    pickupSlots: getPickupTimeSlots(),
  };
}
