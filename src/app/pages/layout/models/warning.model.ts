import {WarningLevel} from './warning_level.enum';

export class Warning{
   message: string;
   level: WarningLevel = WarningLevel.LOW;
   time: number;
}
