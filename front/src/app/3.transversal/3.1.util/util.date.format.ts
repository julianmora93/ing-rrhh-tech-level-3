export const UTIL_DATE_FORMAT = {
    parse: {
        dateInput: 'DD-MM-YYYY'
    },
        display: {
        //dateInput: 'MMM DD, YYYY',
        dateInput: 'DD-MM-YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    },
};

export abstract class UtilDateFormat {

    public static parseStartDateFilter = (dateToParse: Date): string => `${this.parseDate(dateToParse)}T00:00:00`;

    public static parseEndDateFilter = (dateToParse: Date): string => `${this.parseDate(dateToParse)}T23:59:59`;

    public static parseSimpleDate = (dateToParse: Date): string => this.parseDate(dateToParse);

    private static parseDate(date: Date): string {
        const day: number = date.getDate();
        const month: number = date.getMonth() + 1;
        const year: number = date.getFullYear();
        return `${year}-${month}-${day}`;
    }

}