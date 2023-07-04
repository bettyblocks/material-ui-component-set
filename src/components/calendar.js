(() => ({
  name: 'Calendar',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  dependencies: [
    {
      label: 'fullCalendar',
      package: 'npm:@fullcalendar/core@6.1.8',
      imports: ['*'],
    },
    {
      label: 'fullCalendarReact',
      package: 'npm:@fullcalendar/react@6.1.8',
      imports: ['FullCalendar'],
    },
    {
      label: 'fullCalendarDayGrid',
      package: 'npm:@fullcalendar/daygrid@6.1.8',
      imports: ['dayGridPlugin'],
    },
  ],
  jsx: (() => {
    const {
      fullCalendarReact: FullCalendar,
      fullCalendarDayGrid: dayGridPlugin,
    } = dependencies;

    const Calendar = (
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" 
      events={[
        { title: 'event 1', date: '2023-07-05' },
        { title: 'event 2', date: '2023-07-06' }
      ]}
      />
    );

      console.log(Calendar)
    return Calendar
  })(),
  styles: () => {},
}))();
