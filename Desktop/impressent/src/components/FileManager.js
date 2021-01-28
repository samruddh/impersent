import React from 'react';
import ImageUploading from 'react-images-uploading';
import DataApi from '../utils/DataApi';
import Rectangle9 from '../images/Rectangle 9.svg';
import VectorAdd from '../images/Vectoradd.svg';
import '../css/fileManager.css';
import $ from 'jquery';

import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
class FileManager extends React.Component {
  static contextType = DataApi;

  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  // fallback = () => {
  //   console.log('fallback');
  //   var selector = $('<ImageUploading/>')
  //     .attr({
  //       id: 'FilesSelector' /* just for example, use your own attributes */,
  //       // name: 'File',
  //       // type: 'file',
  //       // contentEditable:
  //       //   'false' /* if you "click" on input via label, this prevents IE7-8 from just setting caret into file input's text filed*/,
  //     })
  //     .on('click.filesSelector', function () {
  //       /* do some magic here, e.g. invoke callback for selection begin */
  //       var cancelled = false; /* need this because .one calls handler once for each event type */
  //       setTimeout(function () {
  //         $(document).one('mousemove.filesSelector focusin.filesSelector', function () {
  //           /* namespace is optional */
  //           if (selector.val().length === 0 && !cancelled) {
  //             cancelled = true; /* prevent double cancel */
  //             /* that's the point of cancel,   */
  //             console.log('cancelled');
  //           }
  //         });
  //       }, 1); /* 1 is enough as we just need to delay until first available tick */
  //     })
  //     .on('change.filesSelector', function () {
  //       /* do some magic here, e.g. invoke callback for successful selection */
  //       console.log('success');
  //     });
  //   // .appendTo(yourHolder)
  //   // .end(); /* just for example */
  // };
  componentDidMount() {
    const element = document.getElementById('myCheck');
    element.click();
    console.log(this.context.images);
    // this.fallback();
  }
  render() {
    const onChange = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      this.context.setImages(imageList);
      this.setState({ show: false });
      //   imageList.map((image) =>
      //   this.context.setImages((prevState) => prevState.concat(image['data_url'])),
      // );
      // <Redirect to='photo' />;

      // To redirect to next page
      const element1 = document.getElementById('link');
      element1.click();
    };

    return (
      <div className='file_layout'>
        <div className='top_content_file'>
          <Link to='/impressent' className='redirect_title'>
            <p className='impressent_top_file'>impressent</p>
          </Link>
          <Link to='/impressent' className='link_back'>
            <p className='back_key'>Go back</p>
          </Link>
        </div>
        {/* For getting the image from the user */}
        <ImageUploading
          multiple
          value={this.context.images}
          onChange={onChange}
          // maxNumber={maxNumber}
          dataURLKey='data_url'
          className='mt-5'
          id='FilesSelector'
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div>
              <div className='fall_back'>
                <div>
                  <h3>You have selected {this.context.images.length} Slides</h3>
                  <h4>To select slides please click here</h4>
                </div>

                <button
                  className='select_img'
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                  id='myCheck'
                >
                  <img className='vectorselect' src={VectorAdd} alt=''></img>
                  <p className='add_p'> Select Images</p>
                </button>
              </div>
            </div>
          )}
        </ImageUploading>

        <Link to='/impressent/photo' className='d-none' id='link'></Link>
        <div className='footer_div'>
          <footer className='footer_file'>© Copyright 2020</footer>
        </div>
      </div>
    );
  }
}

export default FileManager;
