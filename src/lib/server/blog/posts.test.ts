import { describe, test, expect } from 'vitest';
import { _postProcessHTML } from './posts';

describe('HTML post processing', () => {
  test('removes "disabled" attribute from checkboxes', () => {
    // Test various formats for the disabled property
    // '<input type="checkbox" disabled=""/>
    expect(_postProcessHTML('<input type="checkbox" id="a" disabled="" class="asdf">')).toBe(
      '<input type="checkbox" id="a" class="asdf"/>'
    );

    // '<input type="checkbox" disabled = ""/>
    expect(_postProcessHTML('<input type="checkbox" id="a" disabled = "" class="asdf">')).toBe(
      '<input type="checkbox" id="a" class="asdf"/>'
    );

    // '<input type="checkbox" disabled/>
    expect(_postProcessHTML('<input type="checkbox" id="a" disabled class="asdf">')).toBe(
      '<input type="checkbox" id="a" class="asdf"/>'
    );

    // Make sure it only applies to checkboxes
    expect(_postProcessHTML('<input id="a" disabled="" class="asdf">')).toBe(
      '<input id="a" disabled="" class="asdf"/>'
    );
  });
  test('properly wraps all elements in task-list-items with spans', () => {
    expect(
      _postProcessHTML(
        `<li class="task-list-item"><input type="checkbox" id="" class="asdf" />Lorem <a>ipsum</a> dolor</li>`
      )
    ).toBe(
      `<li class="task-list-item"><input type="checkbox" id="" class="asdf"/><span>Lorem </span><span><a>ipsum</a></span><span> dolor</span></li>`
    );
  });
});
