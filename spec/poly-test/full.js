var $, $$, HTML, assert, expect, remove, stringify;

HTML = "<style scoped>\n  header {\n    background: orange;\n    height: 50px;\n  }\n\n  main {\n    background: yellow;\n    height: 100px;\n    z-index: 10;\n  }\n\n  footer {\n    background: red;\n    width: 10px;\n    height: 20px;\n  }\n\n  aside {\n    background: blue;\n    width: 100px;\n  }\n\n  ul li {\n    list-style: none;\n    background: green;\n    top: 5px;\n  }\n</style>\n<style type=\"text/gss\">\n  // plural selectors can be used as singular, a la jQ\n  [left-margin] == (main)[right];\n\n  // global condition with nested rules\n  @if (#main)[top] > 50 {\n    main {\n      background: red;\n    }\n  } @else {\n    main {\n      background: yellow;\n    }\n  }\n  header {\n    ::[left] == 0;\n    //// condition inside css rule\n    @if (::scope[intrinsic-width] > ::scope[intrinsic-height]) {\n      ::[width] == ::scope[intrinsic-width] / 4;\n    } @else {\n      ::[width] == ::scope[intrinsic-width] / 2;\n    }\n  }\n  footer {\n    ::[top] == (main)[height]; \n    ::[height] == ::scope[intrinsic-height] * 2;\n  }\n\n  aside {\n    ::[left] == (main)[right];\n    ::[height] == 100;\n    ::[top] == (header)[intrinsic-height] + (header)[intrinsic-y];\n  }\n\n  main {\n    // Bind things to scroll position\n    ::[top] == ::scope[scroll-top] + (header)[intrinsic-y];\n    ::[width] == (aside)[intrinsic-width];\n    ::[left] == (header)[right];\n\n    // use intrinsic-height to avoid binding. Should be:\n    // height: :window[height] - (header)[height];\n    ::[height] == ::scope[intrinsic-height] - (header)[intrinsic-height];\n  }\n  // Custom combinators\n  ul li !~ li {\n\n    ::[height] == 30;\n    \n    // FIXME: Regular css style is never removed (needs specificity sorting and groupping);\n    background-color: yellowgreen;\n  }\n\n  // Chains\n  ul li {\n    // justify by using variable\n    ::[width] == [li-width];\n\n    (&:previous)[right] == &[left];\n    (&:last)[right] == ::scope[intrinsic-width] - 16;\n    (&:first)[left] == 0;\n  }\n</style>\n\n\n<header id=\"header\"></header>\n<main id=\"main\">\n  <ul>\n    <li id=\"li1\">1</li>\n    <li id=\"li2\">2</li>\n    <li id=\"li3\">3</li>\n  </ul>\n</main>\n<aside id=\"aside\"></aside>\n<footer id=\"footer\"></footer>";

assert = chai.assert;

expect = chai.expect;

stringify = function(o) {
  return JSON.stringify(o, 1, 1);
};

$ = function() {
  return document.querySelector.apply(document, arguments);
};

$$ = function() {
  return document.querySelectorAll.apply(document, arguments);
};

remove = function(el) {
  var _ref;
  return el != null ? (_ref = el.parentNode) != null ? _ref.removeChild(el) : void 0 : void 0;
};

describe('Full page tests', function() {
  return it('should kompute', function(done) {
    var container, engine;
    container = document.createElement('div');
    container.style.height = '480px';
    container.style.width = '640px';
    container.style.position = 'absolute';
    container.style.overflow = 'auto';
    container.style.left = 0;
    container.style.top = 0;
    $('#fixtures').appendChild(container);
    window.$engine = engine = new GSS(container);
    container.innerHTML = HTML;
    return engine.then(function(solution) {
      console.log(solution);
      return done();
    });
  });
});
