// import Types from '../../action/types';
// const defaultState = {
//   theme: 'blue',
//   newTime: new Date().getTime(),
// };
// export default function onAction(state = defaultState, action) {
//   switch (action.type) {
//     case Types.THEME_CHANGE:
//     // 1.将redux  state  theme包裹了 一层
//       return {
//         ...state,
//         theme: action.theme,
//         newTime: action.newTime,
//       };

//     default:
//       //返回默认state
//       return state;
//   }
// }
import Types from '../../action/types';
import ThemeFactory, {ThemeFlags} from "../../res/ThemeFactory";

const defaultState = {
    theme: ThemeFactory.createTheme(ThemeFlags.Default),
    onShowCustomThemeView: false,
};
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.THEME_CHANGE:
            return {
                ...state,
                theme: action.theme,
            };
        case Types.SHOW_THEME_VIEW:
            return {
                ...state,
                customThemeViewVisible: action.customThemeViewVisible,
            };
        default:
            return state;
    }

}