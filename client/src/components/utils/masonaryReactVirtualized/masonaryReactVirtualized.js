import React from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  AutoSizer
} from "react-virtualized";
import ImageMeasurer from "react-virtualized-image-measurer";

// Array of images with captions
const list = [
    {
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-647727888-master-1506626232.jpg",
      title: "QUIZ: Has Reese Witherspoon Smooched These Guys On-Screen?"
    },
    {
      image:
        "https://cdn.theatlantic.com/assets/media/img/mt/2017/09/ra_3000x3000-4/facebook.jpg",
      title: "Radio Atlantic: Russia! Live with Julia Ioffe and Eliot A. Cohen"
    },
    {
      image: "https://i.redd.it/th5enkjgumoz.jpg",
      title: "Bar"
    },
    {
      image: "https://imgur.com/lvK8Faf.jpg",
      title:
        "'Cancer patient' finds lump was toy traffic cone inhaled in 1977 | UK news"
    },
    {
      image: "https://i.redd.it/336erdiy5moz.jpg",
      title: "Reddit"
    },
    {
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/img-5675-jpg-1506621753.jpg",
      title:
        "Prepare to Geek Out Over This Adorable Game of Thrones Wedding Shower"
    },
    {
      image:
        "https://venturebeat.com/wp-content/uploads/2017/03/ShopChat-e1506572472915.jpg",
      title: "Effective chatbots master conversational size and fit"
    },
    {
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-647727888-master-1506626232.jpg",
      title: "QUIZ: Has Reese Witherspoon Smooched These Guys On-Screen?"
    },
    {
      image:
        "https://cdn.theatlantic.com/assets/media/img/mt/2017/09/ra_3000x3000-4/facebook.jpg",
      title: "Radio Atlantic: Russia! Live with Julia Ioffe and Eliot A. Cohen"
    },
    {
      image: "https://i.redd.it/th5enkjgumoz.jpg",
      title: "Bar"
    },
    {
      image: "https://i.imgur.com/HjgUCHF.png",
      title:
        "'Cancer patient' finds lump was toy traffic cone inhaled in 1977 | UK news"
    },
    {
      image: "https://i.imgur.com/e89Pb8j.gif",
      title: "It's cool bro, I got this"
    },
    {
      image: "https://i.redd.it/336erdiy5moz.jpg?4",
      title: "Reddit"
    },
    {
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/img-5675-jpg-1506621753.jpg",
      title:
        "Prepare to Geek Out Over This Adorable Game of Thrones Wedding Shower"
    },
    {
      image:
        "https://venturebeat.com/wp-content/uploads/2017/03/ShopChat-e1506572472915.jpg",
      title: "Effective chatbots master conversational size and fit"
    },{
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-647727888-master-1506626232.jpg",
      title: "QUIZ: Has Reese Witherspoon Smooched These Guys On-Screen?"
    },
    {
      image:
        "https://cdn.theatlantic.com/assets/media/img/mt/2017/09/ra_3000x3000-4/facebook.jpg",
      title: "Radio Atlantic: Russia! Live with Julia Ioffe and Eliot A. Cohen"
    },
    {
      image: "https://i.redd.it/th5enkjgumoz.jpg",
      title: "Bar"
    },
    {
      image: "https://imgur.com/lvK8Faf.jpg",
      title:
        "'Cancer patient' finds lump was toy traffic cone inhaled in 1977 | UK news"
    },
    {
      image: "https://i.redd.it/336erdiy5moz.jpg",
      title: "Reddit"
    },
    {
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/img-5675-jpg-1506621753.jpg",
      title:
        "Prepare to Geek Out Over This Adorable Game of Thrones Wedding Shower"
    },
    {
      image:
        "https://venturebeat.com/wp-content/uploads/2017/03/ShopChat-e1506572472915.jpg",
      title: "Effective chatbots master conversational size and fit"
    },
    {
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-647727888-master-1506626232.jpg",
      title: "QUIZ: Has Reese Witherspoon Smooched These Guys On-Screen?"
    },
    {
      image:
        "https://cdn.theatlantic.com/assets/media/img/mt/2017/09/ra_3000x3000-4/facebook.jpg",
      title: "Radio Atlantic: Russia! Live with Julia Ioffe and Eliot A. Cohen"
    },
    {
      image: "https://i.redd.it/th5enkjgumoz.jpg",
      title: "Bar"
    },
    {
      image: "https://i.imgur.com/HjgUCHF.png",
      title:
        "'Cancer patient' finds lump was toy traffic cone inhaled in 1977 | UK news"
    },
    {
      image: "https://i.imgur.com/e89Pb8j.gif",
      title: "It's cool bro, I got this"
    },
    {
      image: "https://i.redd.it/336erdiy5moz.jpg?4",
      title: "Reddit"
    },
    {
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/img-5675-jpg-1506621753.jpg",
      title:
        "Prepare to Geek Out Over This Adorable Game of Thrones Wedding Shower"
    },
    {
      image:
        "https://venturebeat.com/wp-content/uploads/2017/03/ShopChat-e1506572472915.jpg",
      title: "Effective chatbots master conversational size and fit"
    }
  ];
  


export const customFunction = function(containerWidth){
  // We need to make sure images are loaded from scratch every time for this demo
  const noCacheList = list.map((item, index) => ({
    title: index + ". " + item.title,
    image: item.image + (item.image ? "?noCache=" + Math.random() : "")
  }));

  const keyMapper = (item, index) => item.image || index;

  let columnWidth = containerWidth*0.24;
  let defaultHeight = 350;
  let defaultWidth = columnWidth;

  // Default sizes help Masonry decide how many images to batch-measure
  const cache = new CellMeasurerCache({
    defaultHeight,
    defaultWidth,
    fixedWidth: true
  });

  // Our masonry layout will use 3 columns with a 10px gutter between
  const cellPositionerConfig = {
    cellMeasurerCache: cache,
    columnCount: 4,
    columnWidth,
    spacer: 10
  };

  const cellPositioner = createMasonryCellPositioner(cellPositionerConfig);

    
  const MasonryComponent = ({ itemsWithSizes, setRef }) => {
    const cellRenderer = ({ index, key, parent, style }) => {
      const { item, size } = itemsWithSizes[index];
      const height = columnWidth * (size.height / size.width) || defaultHeight;
      return (
        <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
          <div style={style}>
            <div>{item.title}</div>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                style={{
                  height: height,
                  width: columnWidth,
                  display: "block"
                }}
              />
            )}
          </div>
        </CellMeasurer>
      );
    };
    return (
      <AutoSizer>
        {({ height, width }) => {
          return (
            <Masonry
              style={{ 'background-color': 'yellow',}}
              cellCount={itemsWithSizes.length}
              cellMeasurerCache={cache}
              cellPositioner={cellPositioner}
              cellRenderer={cellRenderer}
              height={600}
              width={width}
              keyMapper={keyMapper}
              ref={setRef}
            />
          )
        }}
      </AutoSizer>
    );
  };









  class MyMasonry extends React.Component {
    state = { images: noCacheList };
    // componentWillMount(){
    //   columnWidth = this.props.containerWidth;
    //   defaultWidth = this.props.containerWidth;
    // }
    masonryRef = null;

    // this shows how to significantly change the input array, if items will be only appended this recalculation is not needed
    shorten = () => {
      cache.clearAll();
      cellPositioner.reset(cellPositionerConfig);
      this.masonryRef.clearCellPositions();
      this.setState({ images: [...this.state.images.slice(1)] });
    };

    setMasonry = node => (this.masonryRef = node);

    render() {
      return (
        <div style={{ 'text-align': 'center', 'margin': '0 auto', 'background-color': 'red' }}>
          <button onClick={this.shorten}>Resize</button>
          <ImageMeasurer
              items={this.state.images}
              image={item => item.image}
              keyMapper={keyMapper}
              onError={ (error, item, src) => {console.error("Cannot load image", src, "for item",item,"error",error)} }
              defaultHeight={defaultHeight}
              defaultWidth={defaultWidth}
              >
              {({ itemsWithSizes }) => {
                return (
                  <div style={{ 'background-color': 'green' }}>
                      <MasonryComponent
                        setRef={this.setMasonry}
                        itemsWithSizes={itemsWithSizes}
                        />
                  </div>
                );
              }}
              </ImageMeasurer>
        </div>
      );
    }
  }
  return <MyMasonry />

}










// export default MyMasonry;