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
    const items = data.data.items

    // 一––按下标批量修改（0、2、4、……）
    const idxMods = {
      // 修改第 1 条（index=0）
      0: {
        saleName: '小爱音箱 Pro',
        squareImageUrl: 'https://your.cdn.com/images/seq1.png',
        bonus: '5',
        updateTime: '2025-09-23 00:01:03',
        remark: '脚本批量改：第1条'
      },
      // 修改第 3 条（index=2）
      2: {
        saleName: '小爱音箱 Pro Max',
        squareImageUrl: 'https://your.cdn.com/images/seq3.png',
        bonus: '15',
        updateTime: '2025-09-23 00:00:45',
        remark: '脚本批量改：第3条'
      },
      // 修改第 5 条（index=4）
      4: {
        saleName: '小爱音箱 Mini',
        squareImageUrl: 'https://your.cdn.com/images/seq5.png',
        bonus: '8',
        updateTime: '2025-09-23 00:02:00',
        remark: '脚本批量改：第5条'
      }
      // …如需更多，继续添加 key=index，value={…}
    }

    // 二––按条件批量修改，比如所有 status='1' 的都变成 status='0' 且加标记
    const flagMods = {
      status: '0',
      remark: '原 status=1 脚本统一改 status=0'
    }

    // 应用修改
    items.forEach((item, idx) => {
      // 1. 下标驱动的改动
      if (idxMods[idx]) {
        Object.assign(item, idxMods[idx])
      }
      // 2. 条件驱动的改动
      if (item.status === '1') {
        Object.assign(item, flagMods)
      }
    })
  }

  $done({ body: JSON.stringify(data) })
})()

