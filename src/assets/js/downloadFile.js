export function method1(href) {
  location.href = href;
}

export function method2(src) {
  let iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = `javascript: '<script>location.href=\"${src}\"<\/script>'`;
  document.getElementsByTagName('body')[0].appendChild(iframe);
}

export function method3(src) {
  let form = document.createElement('form');
  form.action = src;
  document.getElementsByTagName('body')[0].appendChild(form);
  form.submit();
}
