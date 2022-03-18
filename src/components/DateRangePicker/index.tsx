import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

import { adjustEndDate } from '@/components/DateRangePicker/adjust-end-date';
import { MonthlyCalendar } from '@/components/MonthlyCalendar';
import { Popover } from '@/components/Popover';
import { isSameDate } from '@/utils/date/isSameDate';
import { useShow } from '@/utils/useShow';

type Props = {
  dateRange: [startDate: Date | null, endDate: Date | null];
  setDateRange: (dateRange: Props['dateRange']) => void;
};

export const DateRangePicker: React.VFC<Props> = (props) => {
  const [firstSelectedDate, setFirstSelectedDate] = useState<Date | null>(null);

  const [startDate, endDate] = props.dateRange;

  const startDateValue = startDate?.toLocaleDateString() ?? '';
  const endDateValue = endDate?.toLocaleDateString() ?? '';

  const { isShown, show, hide } = useShow();

  const onClickInput: React.MouseEventHandler<HTMLInputElement> = (event) => {
    event.currentTarget.blur();

    show();
  };

  const onClickDate = (date: Date) => {
    if (firstSelectedDate == null) {
      setFirstSelectedDate(date);

      props.setDateRange([null, null]);
    } else {
      setFirstSelectedDate(null);

      const newDateRange: [Date, Date] =
        date < firstSelectedDate
          ? [date, adjustEndDate(firstSelectedDate)]
          : [firstSelectedDate, adjustEndDate(date)];
      props.setDateRange(newDateRange);

      hide();
    }
  };

  useEffect(() => {
    if (!isShown) {
      setFirstSelectedDate(null);
    }
  }, [isShown]);

  const isForDate = (date: Date): boolean =>
    startDate != null &&
    endDate != null &&
    startDate <= date &&
    date <= endDate;

  const isSelectedDate = (date: Date): boolean =>
    [firstSelectedDate, startDate, endDate].some(
      (date2) => date2 != null && isSameDate(date, date2),
    );

  return (
    <div>
      <Popover
        trigger={
          <div>
            <input
              value={startDateValue}
              onClick={onClickInput}
              onChange={() => {}}
              className={styles.input}
            />
            <input
              value={endDateValue}
              onClick={onClickInput}
              onChange={() => {}}
              className={styles.input}
            />
          </div>
        }
        placement="left"
        isShown={isShown}
        hide={hide}
      >
        <MonthlyCalendar
          onClickDate={onClickDate}
          dateClassNames={[
            (date) => isForDate(date) && styles.forDate,
            (date) => isSelectedDate(date) && styles.selectedDate,
          ]}
        />
      </Popover>
    </div>
  );
};
