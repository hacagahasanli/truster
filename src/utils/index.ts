const app = $(".keyContainer")
export const createNewKeyWrapper = (value: string = "??") => {
  const keyWrapper = $('<div>').addClass('keyWrapper flexCenterJustify');
  const keySpan = $('<span>').attr('id', 'IamKey');
  keySpan.text(value);
  keyWrapper.append(keySpan);
  app.append(keyWrapper);
}

export const showModal = (removedClass:string, addedClass:string) => {
  $(".modal_container")
    .removeClass(removedClass)
    .addClass(addedClass)
}

export const triggetFocus = () => $('#my-input').trigger("focus");