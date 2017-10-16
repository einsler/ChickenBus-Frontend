import {
    IHomeContent,
    IHomeContentProps,
    IHomeContentStyles
} from './HomeContent.Props';
import { BaseComponent, getRTL } from "office-ui-fabric-react/lib/Utilities";
import { List } from "office-ui-fabric-react/lib/List";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Label } from "office-ui-fabric-react/lib/Label";
import { PrimaryButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { getStyles } from "./HomeContent.styles";
import { exampleBlogItem } from "../../MockData/FrontEndConsts";
import { IBlogItem } from "./index";
import { Image, ImageFit } from "office-ui-fabric-react/lib/Image";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as React from "react";

interface IHomeContentState {
}
const styles: IHomeContentStyles = getStyles();

export class HomeContent extends BaseComponent<IHomeContentProps, IHomeContentState> {
    constructor(props: IHomeContentProps) {
        super(props);
        this.state = {
        }
    }

    public render() {
        return(
          <div style={ styles.root }>
              <div style={ styles.searchPanel }>
                  <div style={ styles.margin }> <TextField label='Origin' placeholder = 'Current Location'/></div>
                  <div style={ styles.margin }>
                    <Label> --> </Label>
                    <PrimaryButton
                      data-automation-id='test'
                      target = '../index/SearchContent'
                      title='Go Button'>
                      GO
                    </PrimaryButton>
                  </div>
                  <div style={ styles.margin }> <TextField label='Destination' /></div>
              </div>
              <div style = { styles.blog }>
                <Label> Blog Content </Label>
                <List
                  items = { exampleBlogItem }
                  onRenderCell = { (item: IBlogItem, index) => (
                  <div className = 'ms-ListBasicExample-ItemCell' data-is-focusable = { true }>
                    <Image
                      className = 'ms-ListBasicExample-itemImage'
                      src = { item.imgurl }
                      width = { 50 }
                      height = { 50 }
                      imageFit = { ImageFit.cover }
                      />
                    <div className = 'ms-ListBasicExample-itemContent'>
                      <div className = 'ms-ListBasicExample-itemName'>{ item.title }</div>
                      <div className = 'ms-ListBasicExample-itemDesc'>{ item.text } </div>
                    </div>
                    <Icon
                      className = 'ms-ListBasicExample-chevron'
                      iconName = { getRTL() ? 'ChevronLeft' : 'ChevronRight' }
                    />
                  </div>
                  )}
                  />
                </div>
                <div style = {styles.ad1}>
                <Label> Advertisements </Label>
                <List
                  items = { exampleBlogItem }
                  onRenderCell = { (item: IBlogItem, index) => (
                  <div className = 'ms-ListBasicExample-ItemCell' data-is-focusable = { true }>
                    <Image
                      className = 'ms-ListBasicExample-itemImage'
                      src = { item.imgurl }
                      width = { 50 }
                      height = { 50 }
                      imageFit = { ImageFit.cover }
                      />
                    <div className = 'ms-ListBasicExample-itemContent'>
                      <div className = 'ms-ListBasicExample-itemName'>{ item.title }</div>
                      <div className = 'ms-ListBasicExample-itemDesc'>{ item.text } </div>
                    </div>
                    <Icon
                      className = 'ms-ListBasicExample-chevron'
                      iconName = { getRTL() ? 'ChevronLeft' : 'ChevronRight' }
                    />
                  </div>
                  )}
                  />
                </div>
                <div style = {styles.ad2}>
                <Label> Advertisements </Label>
                <List
                  items = { exampleBlogItem }
                  onRenderCell = { (item: IBlogItem, index) => (
                  <div className = 'ms-ListBasicExample-ItemCell' data-is-focusable = { true }>
                    <Image
                      className = 'ms-ListBasicExample-itemImage'
                      src = { item.imgurl }
                      width = { 50 }
                      height = { 50 }
                      imageFit = { ImageFit.cover }
                      />
                    <div className = 'ms-ListBasicExample-itemContent'>
                      <div className = 'ms-ListBasicExample-itemName'>{ item.title }</div>
                      <div className = 'ms-ListBasicExample-itemDesc'>{ item.text } </div>
                    </div>
                    <Icon
                      className = 'ms-ListBasicExample-chevron'
                      iconName = { getRTL() ? 'ChevronLeft' : 'ChevronRight' }
                    />
                  </div>
                  )}
                  />
                </div>
          </div>
        )
    }
}
