/*
[rewrite_remote]
^https:\/\/app\.fmcc\.com\.cn\/bass-equity-client-midautumn\/midautumn\/get\/receiveList\?math=.* url script-response-body eq-mod.js

[mitm]
hostname = app.fmcc.com.cn
*/

;(function() {
  let body = $response.body;
  let data;

  try {
    data = JSON.parse(body);
  } catch (err) {
    console.error("JSON 解析失败:", err);
    return $done({});
  }

  // 仅当 code=0000 且存在 items 数组时才处理
  if (data.code === "0000" && data.data && Array.isArray(data.data.items)) {
    // 在此定义要更新的 goodsId 与字段映射
    const updates = {
      "466685850835107706": {
        saleName: "自定义 · XXXXXXX",
        squareImageUrl: "https://your.cdn.com/images/new30.png",
        bonus: "5",
        createTime : "2025-09-23 00:05:32",
        remark: "脚本已更新"
      },
      "509069496554531566": {
        saleName: "自定义 · XXXXXXX",
        createTime : "2025-09-23 00:02:45",
        squareImageUrl: "https://your.cdn.com/images/new88.png",
        bonus: "10",
        remark: "脚本已更新"
      }
      // 如需修改更多 goodsId，可在此继续添加
    };

    data.data.items = data.data.items.map(item => {
      const u = updates[item.goodsId];
      if (u) {
        Object.assign(item, u);
      }
      return item;
    });
  }

  $done({ body: JSON.stringify(data) });
})();

