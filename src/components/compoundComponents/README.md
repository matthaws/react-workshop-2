# Compound Components

The key advantage of React components are their flexibility and re-usability. The compound component design pattern aims to maximize these benefits by making our components super duper crazy flexible. Let's try to look at how this works.

I'm working with a React component that is a very basic "slide show" - the full code is [here](./SlideShow/SlideShow.jsx). Here's the render method:

```javascript
render() {
  const { currentSlide } = this.state;
  const { slides } = this.props;
  const slide = slides[currentSlide];

  return (
    <section className="slide-show">
      <Viewport slide={slide} />
      <ProgressBar
        handleClick={this.handleClick}
        slides={slides}
        currentSlide={currentSlide}
      />
    </section>
  );
}
```

It's made up of two sub components, a Viewport (which is what I'm calling the component that actually renders the current "slide" and takes up most of the screen), and a ProgressBar (where we can see small versions of each slide and click on them to change what the Viewport is rendering). Those components are pretty straightforward:

```javascript
const Viewport = ({ slide }) => {
  return <section className="viewport">{slide.text}</section>;
};

const ProgressBar = ({ slides, handleClick, currentSlide }) => {
  const progressItems = slides.map((slide, idx) => {
    const className = currentSlide === idx ? "active slide" : "slide";
    return (
      <li onClick={handleClick(idx)} className={className}>
        {slide.text}
      </li>
    );
  });

  return <ul className="progress-bar">{progressItems}</ul>;
};
```

This works. However, it's not very flexible. The SlideShow component will always render the Viewport first and then the ProgressBar, because that's what's in its render method. So if I wanted to re-use this component elsewhere in my app but have the ProgressBar come first or, even more extreme, have TWO progress bars for some reason, I couldn't really do that without rewriting a whole new version of this component with tweaks to the render method. And that's not very DRY, is it? That's about as DRY as a tropical storm. There's got to be a better way. And there is!

Instead of specifying exactly what is to be rendered in the SlideShow component, we're going to draw from what we learned about higher order components to tell it to simply render whatever its children are in order to be more flexible. The idea is that we could be declarative about what we want when we render the SlideShow component, like this:

```javascript
const SlideShowDemo = () => (
  <section>
    <SlideShow>
      <ProgressBar />
      <Viewport />
      <ProgressBar />
    </SlideShow>
  </section>
);
```

This way I would be able to put the subcomponents in whatever order or in however many numbers I wanted. I can have _two_ ProgressBars because I deserve two if I want! All it takes to make this work in the SlideShow component render method is this:

```javascript
return <section className="slide-show">{this.props.children}</section>;
```

Remember that `this.props.children` is a property given by React that refers to any components or elements placed between the opening and closing tags of this component where it was rendered (as in the example above).

So this is pretty cool but there's still a problem. As written, Viewport needs a prop from SlideShow to work (`slide`) and ProgressBar needs three (`handleClick`, `currentSlide`, and `slides`). Rendering children via `this.props.children` doesn't pass down any props. So as is we are going to get an error when those props come up undefined.

Fortunately, there's a way to address this using two really cool React utility methods. One is `React.Children.map`, which behaves similarly to `Array.map` only it works for React children (they are an opaque data structure and not a normal array, actually, which is why they get their own special method), and the other is `React.cloneElement` which allows us to make a copy of a React element while injecting additional props. The result looks like this:

```javascript
render() {
  const { currentSlide } = this.state;
  const { slides } = this.props;
  const slide = slides[currentSlide];

  const children = React.Children.map(this.props.children, child =>
    React.cloneElement(child, {
      slide,
      handleClick: this.handleClick,
      slides,
      currentSlide
    })
  );
  return <section className="slide-show">{children}</section>;
}
```

We are iterating over all the children and generating a copy of them that includes the 4 props we know they may need. Note that we don't know whether each child is a Viewport or a ProgressBar so we're just passing everything for now. We could probably micro-optimize this but this works for simple demo.

And bingo! We now have much more flexibility in how the subcomponents get rendered, in what order, and how many. Because these literally are smaller pieces of the same parent component, its a common pattern to add these components as properties on the parent component itself, like this:

```javascript
class SlideShow extends Component {
  static Viewport = Viewport;
  static ProgressBar = ProgressBar;

  //...all the other code
}
```

This is in effect the same as:

```javascript
SlideShow.Viewport = Viewport;
SlideShow.ProgressBar = ProgressBar;
```

The advantage here is a nice clean semantic UI when we use the SlideShow component:

```javascript
const CompoundDemo = () => (
  <section>
    <SlideShow>
      <SlideShow.ProgressBar />
      <SlideShow.Viewport />
    </SlideShow>
  </section>
);
```

This is a compound component, in that it is made up of smaller subcomponents that can be used piecemeal as you want them. Right now, however, our implementation requires the ProgressBar and Viewport to be _direct_ children of SlideShow in order to get those props they need from SlideShow. It will break if we introduce a wrapping div for styling or something, because when we iterate over `this.props.children` in SlideShow, we are only dealing with direct children.

It used to be more complicated to fix this problem. But now we have a cool new tool for this - more on that in the next section!
