# obs-pomo

obs 内蔵ブラウザで表示する用のポモドーロタイマー

## Usage

- https://obs-pomo.vercel.app/ を読み込んで表示
- 各種オプション（クエリパラメータで指定）
  - worktime: 作業時間（分） / デフォルト: 25 分
  - breaktime: 休憩時間（分） / デフォルト: 5 分
  - worklabel: 作業中に表示するラベル / デフォルト: "work"
  - breaklabel: 休憩中に表示するラベル / デフォルト: "break"
  - volume: 作業開始、終了時のジングル音量(0-1) / デフォルト: 0.5
- サンプル
  - https://obs-pomo.vercel.app/?worktime=50&breaktime=10&volume=0.2&worklabel=🏋️&breaklabel=🏝️
