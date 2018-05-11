# Context

If you weren't deep in the course at the time, you might remember that a few months back there was a lot of excited hubbub about [Dan Abramov's talk at JSConf about React 16's new features](https://www.youtube.com/watch?v=v6iR3Zk4oDY). Why were people so excited about it? Well, one of the reasons (and there are a few) has to do with the new, reworked Context feature.

We didn't teach React Context in the course and for good reason - up until now it has been an experimental feature that even the React docs warned should be used with extreme caution and probably avoided. But not anymore! As of React 16, it is a stable feature and very useful.

But what is it? As you know, in vanilla React (no Redux) there generally isn't any way for a component to receive a prop other than getting it from a parent. That means if a component needs to pass a prop to another component further down the "tree" (perhaps a grandchild component, or a great-child, and so on and so forth) the props need to be passed down to every component in between, each of which also need to pass down the props themselves until it finally reaches the component where its needed. That's often called "prop drilling" and it means that props are passing through a lot of components that don't even care about them. Its more code, more places to miss something and cause a bug, and more potential for problems.

One of the several great things Redux does for us is give us a way to avoid prop drilling by directly connecting components to the Redux store. But now something similar is also possible using just React! We can create a Context, which will come with a Provider and a Consumer. Provider sounds very similar to Redux already, right? Just like in Redux, the Provider will wrap any components where we want the Context to be accessible. The Consumer will then be used to pull out data from the Context where we need it.

But let's look at an example. In the Compound Components section, we made a version of the SlideShow component that allowed you to flexibly declare where and how many Viewports and ProgressBars you wanted on a given instance of SlideShow. But it had the drawback that those subcomponents needed to be _direct_ children of SlideShow in order to work since we iterate over the children of the SlideShow component and inject the necessary props. If Viewports or ProgressBars were nested under a div or something (perhaps for some styling purposes), the whole thing would break.

This sounds like a great place to use the Context API to give Viewport and ProgressBar access to the props they need, so that no matter how deeply nested they get they'll always work. Let's get started by making a Context object.

```javascript
const SlideShowContext = React.createContext();
```

Yup. It's that easy. Thanks, React!

OK now the actual tricky part comes in how to use it. As I mentioned, the Context will have two subcomponents of its own, a Provider and a Consumer. We're going to need to wrap the Provider around the whole SlideShow content so that any Viewports and ProgressBars that are descendants of it have access. We'll do that in the SlideShow component render method:

```javascript
render() {
  const { currentSlide } = this.state;
  const { slides } = this.props;
  const slide = slides[currentSlide];

  return (
    <SlideShowContext.Provider
      value={{
        slide,
        slides,
        currentSlide,
        handleClick: this.handleClick
      }}
    >
      <section className="slide-show">{this.props.children}</section>;
    </SlideShowContext.Provider>
  );
}
```

We're no longer iterating over the children and cloning. Now we just render `this.props.children` directly, trusting the Provider and Consumer to handle the props. The Provider takes a prop called `value` which is an object with the data you want all child Consumers to have access to.

Using the Consumer is a little trickier. A Consumer needs a function as its direct child, which will receive the `value` prop from the provider as its argument. Here's it in use for the Viewport and ProgressBar components:

```javascript
export const Viewport = () => (
  <SlideShowContext.Consumer>
    {({ slide }) => <section className="viewport">{slide.text}</section>}
  </SlideShowContext.Consumer>
);

export const ProgressBar = ({ slides, handleClick, currentSlide }) => {
  return (
    <SlideShowContext.Consumer>
      {({ slides, handleClick, currentSlide }) => {
        const progressItems = slides.map((slide, idx) => {
          const className = currentSlide === idx ? "active slide" : "slide";
          return (
            <li onClick={handleClick(idx)} className={className}>
              {slide.text}
            </li>
          );
        });

        return <ul className="progress-bar">{progressItems}</ul>;
      }}
    </SlideShowContext.Consumer>
  );
};
```

Inside that child function we're pulling out the data we care about with object destructuring, then using them to render just like we did when that data was coming in as props in the traditional way.

Note that we are making a context specific to one component. I could make multiple contexts for different components or features, sort of like independent slices of state. This is how it is typically used and demoed, and how all the official React docs show off using the future.

However, I could also, theoretically, make an app-wide context that wraps the entire app and then behaves a lot like the Redux store. This explains why you may have heard people talk about the new Context API making Redux irrelevant, but that's not entirely true. Redux does more than just state management and could still be the right tool for a lot of projects. But we all know that sometimes the Redux boilerplate code is overkill for some smaller projects and we have the option now of using React's native Context for some help with state management and avoiding prop drilling.

### Resources

* [Official React docs on Context](https://reactjs.org/docs/context.html)

* [A thorough guide and demo from Robin Wieruch](https://www.robinwieruch.de/react-context-api/)

* [An amazing comparison of React Context, Redux, and basically other React state manipulategement solution out there.](https://github.com/GantMan/ReactStateMuseum)
