import Types from '../types';
export function onThemeChange({theme, updateTime}) {
  return {type: Types.THEME_CHANGE, theme: theme, newTime: updateTime};
}
