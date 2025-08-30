import { config } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { JSDOM } from 'jsdom'

// 创建 JSDOM 实例
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  runScripts: 'dangerously'
})

// 设置全局对象
global.window = dom.window
global.document = dom.window.document
global.navigator = dom.window.navigator

// 全局配置 Vue Test Utils
config.global.plugins = [
  createPinia()
]

// 可以添加其他全局测试设置