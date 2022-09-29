import React from 'react';
import {render} from 'test-utils';
import Application from 'components/base/Application/Application.component';

describe('<Application />', () => {
  it('does not throw', () => {
    expect(() => render(<Application />)).not.toThrow();
  });

  it('should render the correct root', () => {
    // Arrange
    const {container} = render(<Application />);

    // Assert
    expect(container.firstChild).toHaveClass('fs-web-application');
  });

  it('renders with the correct content', () => {
    // Arrange
    const {container} = render(<Application />);

    // Assert
    expect(container).toHaveTextContent('Hello World');
    expect(container).toMatchInlineSnapshot(`
<div>
  <main
    class="fs-web-application"
  >
    <section>
      Hello World
    </section>
  </main>
</div>
`);
  });
});
