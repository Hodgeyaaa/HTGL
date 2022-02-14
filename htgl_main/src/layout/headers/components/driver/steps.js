// import i18n from "@/i18n";

// const t = i18n.global.t;

export const steps = (t) => { return [
    //github文档中的driver.defineSteps
    //数据源
    {
        element: '#guide',
        popover: {
          title:  t('driver.guideBtn'),
          description: 'Body of the popover',
          position: 'left'
        }
      },
      {
        element: '#hamburger',
        popover: {
          title: t('driver.hamburgerBtn'),
          description: 'Body of the popover',
          position: 'right'
        }
      },
      {
        element: '#screen',
        popover: {
          title: t('driver.fullScreen'),
          description: 'Body of the popover',
          position: 'left'
        }
      },
]}