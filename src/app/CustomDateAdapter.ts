import { NativeDateAdapter } from "@angular/material";
import * as moment from 'moment';

export class CustomDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        moment.locale('fr'); // Choose the locale
        var formatString = (displayFormat === 'input')? 'DD.MMMM.YYYY' : 'LL';
        return moment(date).format(formatString);
    }
}
