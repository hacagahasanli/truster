const app = $(".keyContainer")
export const createNewKeyWrapper = (value: string = "??") => {
    const keyWrapper = $('<div>').addClass('keyWrapper flexCenterJustify');
    const keySpan = $('<span>').attr('id', 'IamKey');
    keySpan.text(value);
    keyWrapper.append(keySpan);
    app.append(keyWrapper);
  }
  