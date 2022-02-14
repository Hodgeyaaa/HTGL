import SvgIcon from '../components/svgIcon/SvgIcon.vue'
const svgRequired = require.context('./svg', false, /\.svg$/)
svgRequired.keys().forEach(item => {
    svgRequired(item)
});
export default app => {
    app.component('svg-icon', SvgIcon)
}