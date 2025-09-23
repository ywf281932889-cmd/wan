/*
[rewrite_remote]
// 拦截中秋领取列表接口
^https:\/\/app\.fmcc\.com\.cn\/bass-equity-client-midautumn\/midautumn\/get\/receiveList\?math=.* url script-response-body https://raw.githubusercontent.com/ywf281932889-cmd/wan/main/main/123/eq-mod.js

[mitm]
hostname = app.fmcc.com.cn
*/

;(function() {
  let data
  try {
    data = JSON.parse($response.body)
  } catch {
    return $done({})
  }

  if (data.code === '0000' && data.data && Array.isArray(data.data.items)) {
    // 0→第1条；1→第2条；2→第3条；以此类推
    const modsByIndex = {
      0: {
        saleName: '小爱音箱',
        updateTime: '2025-09-23 00:01:03',
        createTime: '2025-09-23 00:01:03',
        remark: '只修改第1项'
      },
      1: {
        updateTime: '2025-09-23 00:00:47',
        createTime: '2025-09-23 00:00:47',
        remark: '只修改第2项'
      },
      2: {
        //saleName: '小爱音箱',
        updateTime: '2025-09-23 00:00:45',
        createTime: '2025-09-23 00:00:45',
        remark: '只修改第3项'
      },
      4: {
        saleName: '小爱音箱',
        updateTime: '2025-09-23 00:00:30',
        createTime: '2025-09-23 00:00:47',
        remark: '只修改第4项'
      },
      // 依此类推，想改第4条就加 3: {…}，第5条就加 4: {…}
    }

    data.data.items = data.data.items.map((item, idx) => {
      const mod = modsByIndex[idx]
      if (mod) Object.assign(item, mod)
      return item
    })
  }

  $done({ body: JSON.stringify(data) })
})()



