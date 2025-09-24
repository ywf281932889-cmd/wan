/*
[rewrite_remote]
// 拦截博饼接口，模拟对堂奖项
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

  data = {
    code: "0000",
    msg: "成功",
    data: [
      {
        dicePoint: ["3", "3", "3", "3", "5", "6"],
        dicePointDesc: "对堂",
        diceAward: 3,
        recordIs: null,
        logoUrl: null,
        prizeName: null,
        saleName: "朴朴55元券包",
        squareImageUrl: "https://app.fmcc.com.cn/group2/M00/01/07/CizXIWjD6RmAcx_1AAGF52VmiZs974.png",
        goodsId: "246447633239368782",
        relationId: "93"
      }
    ],
    success: true
  }

  $done({ body: JSON.stringify(data) })
})()
