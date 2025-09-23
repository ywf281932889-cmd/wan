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
    // 按下标批量配置要修改的字段
    // 下标 0 = 第1条；2 = 第3条；4 = 第5条；以此类推
    const modsByIndex = {
      0: {
        saleName: '小爱音箱 Pro',
        squareImageUrl: 'https://your.cdn.com/images/seq1.png',
       // bonus: '5',
        updateTime: '2025-09-23 00:01:03',
        createTime: '2025-09-23 00:01:03',
        remark: '只修改第1项'
      },
      2: {
        saleName: '小爱音箱 Pro Max',
        squareImageUrl: 'https://your.cdn.com/images/seq3.png',
       // bonus: '15',
        updateTime: '2025-09-23 00:00:45',
        createTime: '2025-09-23 00:00:45',
        remark: '只修改第3项'
      },
      4: {
        saleName: '小爱音箱 Mini',
        squareImageUrl: 'https://your.cdn.com/images/seq5.png',
       // bonus: '8',
        updateTime: '2025-09-23 00:00:45',
        createTime: '2025-09-23 00:00:45',
        remark: '只修改第5项'
      }
      // 如果还要修改第7、第9……就继续按 “6: {…}” 或 “8: {…}” 添加
    }

    data.data.items = data.data.items.map((item, idx) => {
      const mod = modsByIndex[idx]
      if (mod) {
        Object.assign(item, mod)
      }
      return item
    })
  }

  $done({ body: JSON.stringify(data) })
})()


