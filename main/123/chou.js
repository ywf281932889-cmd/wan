/*
[rewrite_remote]
^https:\/\/app\.fmcc\.com\.cn\/bass-equity-client-midautumn\/midautumn\/playDice\?math=.* url script-response-body https://raw.githubusercontent.com/ywf281932889-cmd/wan/refs/heads/main/main/123/chou.js

[mitm]
hostname = app.fmcc.com.cn
*/

;(function () {
  let data
  try {
    data = JSON.parse($response.body)
  } catch {
    return $done({})
  }

  if (data?.code === '0000' && Array.isArray(data.data)) {
    const item = data.data[0]
    if (item) {
      item.dicePoint = ["5", "6", "3", "4", "1", "2"]
      item.dicePointDesc = "对堂"
      item.diceAward = 3
      item.saleName = "小爱音箱pro"
      item.squareImageUrl = "https://app.fmcc.com.cn/group2/M00/01/07/CizXIWjD8IOAEx_OAACGP3kuJ7A327.png";
      
    }
  }

  $done({ body: JSON.stringify(data) })
})()
