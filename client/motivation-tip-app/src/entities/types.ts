export interface DailyTip {
  id: string;
  title: string;
  description: string;
}

export interface DailyTipsData {
  dailyTips: DailyTip[];
}

export interface DailyTipData {
  dailyTip: DailyTip;
}

export interface DailyTipFormData {
  title: string;
  description: string;
}
