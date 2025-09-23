/*
[rewrite_remote]
// 拦截中秋领取列表接口
^https:\/\/app\.fmcc\.com\.cn\/bass-equity-client-midautumn\/midautumn\/get\/receiveList\?math=.* url script-response-body https://raw.githubusercontent.com/ywf281932889-cmd/wan/main/main/123/eq-mod.js

[mitm]
hostname = app.fmcc.com.cn
*/

;(function() {
  let body = $response.body
  let data

  try {
    data = JSON.parse(body)
  } catch (err) {
    console.error('JSON 解析失败:', err)
    return $done({})
  }

  if (data.code === '0000' && data.data && Array.isArray(data.data.items)) {
    // 只要修改第1项（idx=0）和第3项（idx=2），其余保持原样
    const modifications = {
      0: {
        saleName: '小爱音箱Pro',
        squareImageUrl: 'https://your.cdn.com/images/seq1.png',
        bonus: '5',
        updateTime: '2025-09-23 00:01:03',
        remark: '只修改第1项'
      },
      2: {
        saleName: '小爱音箱Pro',
        squareImageUrl: 'https://your.cdn.com/images/seq3.png',
        bonus: '15',
        updateTime: '2025-09-23 00:00:45',
        remark: '只修改第3项'
      }
    }

    data.data.items = data.data.items.map((item, idx) => {
      const mod = modifications[idx]
      if (mod) {
        Object.assign(item, mod)
      }
      return item
    })
  }

  $done({ body: JSON.stringify(data) })
})()
