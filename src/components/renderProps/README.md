# Render props

As we've seen, Higher Order Components can be very useful as a pattern to wrap React components with extra functionality. However, not everybody is a fan of this pattern. For one thing, it can get a little complicated when you have multiple HOCs, and for another we often face the old prop drilling problem again: any props the wrapped component needs have to be passed down through all the wrapping HOCs. The Context API helps with this, as we saw, but things could get pretty complicated pretty quickly and also now what's actually being rendered gets spread out across different files and components.

An alternative approach that many devs like is called "render props" or a "render callback". Let's take a look.

Here's a higher order component called `withMouseWatch`. It adds an event listener on mouse movement and passes the x and y location of the mouse to the wrapped child component as props:

```javascript
const withMouseWatch = WrappedComponent => {
  return class extends Component {
    state = { x: 0, y: 0 };

    componentDidMount() {
      window.addEventListener("mousemove", this.handleMove);
    }

    handleMove = e => {
      this.setState({
        x: e.clientX,
        y: e.clientY
      });
    };

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  };
};
```

And here are two components we've designed to work with that wrapper, one that simply logs the x/y coordinates on the upper left of the screen and one that renders a cat chasing the mouse cursor around:

```javascript
const ShowPosition = ({ x, y }) => (
  <p style={{ position: "fixed", top: 0, left: 0 }}>
    x: {x}, y: {y}
  </p>
);

const CatChase = ({ x, y }) => (
  <img
    style={{ position: "absolute", top: y - 100, left: x, height: "100px" }}
    src={cat}
  />
);
```

Note I'm using inline styles for CSS on these React components, using a Javascript object with keys of CSS properties. When Babel parses the JSX code, it will also turn this object into inline styling like you may have seen on regular HTML elements.

There are a _lot_ of different approaches for CSS with React, and a lot of people are fans of this method -- you were probably told to avoid inline styling, and that used to be generally held wisdom. The component-based approach of React changes things up a bit. In this case, it does have the benefit of letting us easily set some of our CSS properties with variables. I recommend experimenting with several different React/CSS integrations and find the one you like.

But back to our withMouseWatch HOC. Let's see how we'd use this:

```javascript
const RenderPropsDemo = () => {
  const CatChaseWatched = withMouseWatch(CatChase);
  return <CatChaseWatched />;
};
```

The alternative, using the render props approach, suggests that rather than creating a new wrapping component we could just pass down a prop of a function that produced whatever we wanted to be ultimately rendered. It would look like this:

```javascript
const RenderPropsDemo = () => {
  return <MouseWatch render={(x, y) => <ShowPosition x={x} y={y} />} />;
};
```

Inside of MouseWatch, we expect this prop and use it accordingly:

```javascript
class MouseWatch extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  };

  state = { x: 0, y: 0 };

  componentDidMount() {
    window.addEventListener("mousemove", this.handleMove);
  }

  handleMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    });
  };

  render() {
    const { x, y } = this.state;
    return <div>{this.props.render(x, y)}</div>;
  }
}
```

In the render method of MouseWatch, I simply invoke the prop of render and pass in the data I care about. Note that there's no reason this function passed as a prop literally needs to be called "render". That's just the name I happened to give the prop because its semantic, but we could call it "potato" and invoke `this.props.potato(x, y)` in the render method here and it would work just the same.

Ultimately this is just a slightly different approach to have the same kind of wrapping functionality as HOCs. Proponents of render props argue that it avoids prop drilling and is more dev-friendly because you can declare what the wrapping component will render in the same place where you are rendering the component itself. We could do something like this:

```javascript
const RenderPropsDemo = () => {
  return <MouseWatch render={(x, y) => {
    // any other code I wanted to do some fancy stuff with x and y
    return (
      <div>
        <ShowPosition x={x} y={y} />
        <CatChase x={x} y={y} />
      </div>
    )
  }
  />};
};
```

It's easier to see what will be rendered or to manipulate the data in a specific way without ever having to leave this file. Supporters of this pattern say it makes components much more reusable and flexible than even the higher order component pattern. In fact, supporters of the render prop pattern tend to be _very_ vocal and outspoken about how great it is, as you can find with a Google search and reading some articles.

Not everybody likes it, though as some claim there's performance costs and its pretty easy to quickly make render functions long, complicated, and unreadable.

I think there's merit to both sides, and both approaches have their pros and cons. Experiment with both and see what you like. But at the end of the day, its invaluable for you to know about these various patterns even if you end up choosing not to use them in your personal projects.

### Resources

* [Official React docs on render props](https://reactjs.org/docs/render-props.html)

* [Article by Michael Jackson](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) (the coder, not the pop icon) who is a HUGE proponent of this pattern and thinks it could completely replace higher order components. He goes into more complicated examples of why this pattern becomes useful.
