import type { Locale } from "../primitives";

export default {
  name: "简体中文",
  code: "zh-CN",
  messages: {
    noData: "暂无数据",
    closeButton: {
      label: "关闭",
    },
    spinner: {
      loading: "加载中",
    },
    pagination: {
      previous: "上一页",
      next: "下一页",
      pageOf: "第 {page} 页",
    },
    inputItem: {
      deleteTag: "删除",
    },
    calendar: {
      weekNumber: "周数",
      switchView: {
        year: "切换到年视图",
        decade: "切换到年代视图",
      },
      previous: {
        month: "上个月",
        year: "上一年",
        decade: "上个年代",
      },
      next: {
        month: "下个月",
        year: "下一年",
        decade: "下个年代",
      },
    },
    fileUpload: {
      maxFiles: "只允许上传 {maxFiles} 个文件.",
      maxSize: "文件 {fileName} 大小超过 {maxSize}.",
      minSize: "文件 {fileName} 大小小于 {minSize}.",
      notAccept: "文件 {fileName} 是不允许的类型.",
      transform: "文件 {fileName} 转换错误: {error}",
      remove: "移除文件",
      upload: "上传",
      retry: "重试",
      uploadError: "错误: {error}",
      deleteError: "删除远程文件失败.",
    },
  },
} as Locale;
