import Vue from 'vue';
import viewPhoto from './viewPhoto';

viewPhoto.newInstance = () => {
  const Instance = new Vue({
    render(h) {
      return h(viewPhoto, null);
    },
  });
  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const viewCom = Instance.$children[0];
  return {
    component: viewPhoto,
    open(e) {
      viewCom.openView(e);
    },
  };
};

export default viewPhoto;
