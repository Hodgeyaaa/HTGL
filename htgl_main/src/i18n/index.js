import {createI18n} from 'vue-i18n'
import EN from './en'
import ZH from './zh'
// 数据源
const messages = {
    en: {
       ...EN
    },
    zh: {
        ...ZH
    }
}

// 设置当前语言
const getCurrentLanguage = () => {
    const UAlang = navigator.language   //如果是中文就是zh-CN
    const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
    localStorage.setItem('lang', langCode)
    return langCode
}

// vue3下的i18n配置
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: getCurrentLanguage() || 'zh',
    messages: messages
})

export default i18n