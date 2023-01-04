<template>
    <div>
        <swiper class="calendar-container w-full h-[100vh]" ref="swiper" :modules="modules" :slides-per-view="1" navigation :pagination="{ clickable: true }" :scrollbar="{ draggable: true }" :preloadImages="false" @swiper="onSwiper" @slideChange="onSlideChange" @slideNextTransitionEnd="handlingNext" @slidePrevTransitionEnd="prevSlide" @sliderMove="onSliderMove">
            <swiper-slide class="calendar w-full h-full">
                <FullCalendar :options="calendarOptions" ref="prevCalendar" />
            </swiper-slide>
            <swiper-slide class="calendar w-full h-full">
                <FullCalendar :options="calendarOptions" ref="centerCalendar" />
            </swiper-slide>
            <swiper-slide class="calendar w-full h-full">
                <FullCalendar :options="calendarOptions" ref="nextCalendar" />
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
// Import Swiper styles
import 'swiper/css';
export default {
    components: {
        Swiper,
        SwiperSlide,
        FullCalendar,
    },
    data() {
        return {
            swiper: useSwiperSlide(),
            centerCalendarApi: undefined,
            prevCalendarApi: undefined,
            nextCalendarApi: undefined,
            isInDrag: false,
            modules: [Navigation, Pagination, Scrollbar, A11y],
            calendarOptions: {
                events: [
                    {
                        title: 'event1',
                        start: new Date().setHours(11),
                    },
                ],
                eventDragStart: () => {
                    // this.$data.isInDrag = true;
                },
                eventDragStop: () => {
                    // this.$data.isInDrag = false;
                },
                selectable: false,
                selectMirror: false,
                plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
                initialView: 'timeGridWeek',
                select: this.handleDateClick,
                allDaySlot: false,
                locale: 'it',
                slotDuration: '00:15',
                editable: false,
                slotLabelInterval: '01:00',
                scrollTimeReset: false,
                scrollTime: '10:00:00',
                headerToolbar: false,
                nowIndicator: true,
                firstDay: 1,
                businessHours: {
                    // days of week. an array of zero-based day of week integers (0=Sunday)
                    daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Thursday

                    startTime: '10:00', // a start time (10am in this example)
                    endTime: '18:00', // an end time (6pm in this example)
                },
                slotLabelFormat: {
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: false,
                },
                dayHeaderFormat: { weekday: 'short', day: 'numeric', omitCommas: true },
                dayHeaderContent: function (arg) {
                    let text = arg.text.split(' ');
                    let day = text[1];
                    let weekday = text[0];
                    let firstP = document.createElement('p');
                    firstP.classList.add('dayHeaderDay');
                    firstP.innerHTML = day;

                    let secondP = document.createElement('p');
                    secondP.classList.add('dayHeaderWeekDay');
                    secondP.innerHTML = weekday;
                    if (arg.isToday) {
                        firstP.classList.add('today');
                        secondP.classList.add('today');
                    }
                    return { domNodes: [firstP, secondP] };
                },
                height: '100%',
            },
        };
    },
    watch: {
        isInDrag(value) {
            this.centerCalendarApi.setOption('selectable', !value);
            this.centerCalendarApi.setOption('selectMirror', !value);
            this.centerCalendarApi.setOption('editable', !value);
        },
    },
    mounted() {
        this.centerCalendarApi = this.$refs.centerCalendar.getApi();
        this.prevCalendarApi = this.$refs.prevCalendar.getApi();
        this.nextCalendarApi = this.$refs.nextCalendar.getApi();
        this.prevCalendarApi.prev();
        this.nextCalendarApi.next();
    },
    methods: {
        onSliderMove() {
            this.isInDrag = true;
        },
        onSwiper(swiper) {
            swiper.slideTo(1, 0, false);
        },
        handlingNext(swiper) {
            this.calendarNext();
            swiper.slideTo(1, 0, false);
        },
        prevSlide(swiper) {
            this.calendarBack();
            swiper.slideTo(1, 0, false);
        },
        onSlideChange(swiper) {
            console.log('slide change', swiper.realIndex);
            this.isInDrag = false;
            console.log('slide change', this.isInDrag);
        },
        calendarBack() {
            this.centerCalendarApi.prev();
            this.prevCalendarApi.prev();
            this.nextCalendarApi.prev();
        },
        calendarNext() {
            this.centerCalendarApi.next();
            this.prevCalendarApi.next();
            this.nextCalendarApi.next();
        },
    },
};
</script>

<style lang="scss">
.calendar-container {
    .calendar {
        height: 100vh;
        .fc {
            .fc-scrollgrid {
                border: none;
            }
            tr {
                .fc-timegrid-slot-label {
                    border: none;
                }
            }
            th {
                border: none !important;
                &:not(:first-child) {
                    /*FIRST LINE AFTER DAYHEADER*/
                    border-bottom: 1px solid #ddd !important;
                }
                .fc-col-header-cell-cushion {
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    height: 100%;
                    user-select: none;
                    p {
                        //HEADER DAY CELL
                        color: #666;
                        padding: 0;
                        margin: 0;
                        font-weight: 500;
                        &.dayHeaderDay {
                            font-size: 1.5rem;
                            height: 2.5rem;
                        }
                        &.dayHeaderWeekDay {
                            font-weight: 800;
                            font-size: 0.8rem;
                        }
                        &.today {
                            color: blue;
                            &:first-child {
                                z-index: 10;
                                color: white;
                                width: 2.5rem;
                                line-height: 2.5rem;
                                border-radius: 50%;
                                background-color: blue;
                            }
                        }
                    }
                }
            }
            .fc-timegrid-slot-label-cushion {
                //LABEL HOUR
                font-weight: 400;
                font-size: 0.8rem;
                margin-right: 0.2rem;
            }
            .fc-non-business {
                background: repeating-linear-gradient(45deg, rgba(80, 80, 80, 0.308), rgba(80, 80, 80, 0.308) 4px, rgba(128, 128, 128, 0.315) -2px, rgba(128, 128, 128, 0.295) 27px);
            }

            /*NOW INDICATORS*/
            .fc-timegrid-now-indicator-arrow {
                display: none;
            }
            .fc-timegrid-now-indicator-line {
                border-width: 2px;
            }

            /*GESTIONE COLORI BORDI GRID*/
            .fc-timegrid-col {
                //ENTIRE COLUMN FOR DAYS
                //border: 2px solid rgba(221, 221, 221, 1);
                &.fc-day-today {
                    background-color: rgba(221, 221, 221, 0.3);
                }
            }
            .fc-timegrid-slot-minor {
                border-top-style: solid;
                border-color: rgba(221, 221, 221, 0.3);
                border-width: 1px;
            }
        }
        .fc-theme-standard td,
        .fc-theme-standard th {
            //border-top: 2px solid #ddd;
        }
    }
}
</style>
