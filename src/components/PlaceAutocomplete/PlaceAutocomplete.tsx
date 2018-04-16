import {
  IPlaceAutocomplete,
  IPlaceAutocompleteProps,
  IPlaceAutocompleteStyles
} from './PlaceAutocomplete.Props';
import { BaseComponent, autobind, KeyCodes } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { Label } from "office-ui-fabric-react/lib/Label";
import { supportedCountries } from "../../MockData/FrontEndConsts";
import { getStyles } from "./PlaceAutocomplete.styles";
import { DetailedReactHTMLElement, InputHTMLAttributes } from "react";

interface IPlaceAutocompleteState {

}

const styles = getStyles();

export class PlaceAutocomplete extends BaseComponent<IPlaceAutocompleteProps, IPlaceAutocompleteState> implements IPlaceAutocomplete {
  private _autocomplete: google.maps.places.Autocomplete;

  constructor(props: IPlaceAutocompleteProps) {
    super(props);

    this.state = {
    }
  }

  /**
   * Method controlling what happens when enter is pressed while focusing on the input element.
   */
  @autobind
  private _onRouteEnter(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (ev.which === KeyCodes.enter) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onEnterPressed();
    }
  }

  /**
   * Public method called to return this component's autocomplete result.
   */
  public getPlace(): google.maps.places.PlaceResult {
    return this._autocomplete.getPlace();
  }

  /**
   * Public method called to return the coordinates of the autocomplete's result.
   */
  public getCoords(): google.maps.LatLng {
    try {
      return this._autocomplete.getPlace().geometry.location;
    } catch (e) {
      return undefined;
    }
  }

  /**
   * Method for initializing the google maps autocomplete with the html input element
   * @param input
   */
  @autobind
  private setAutocomplete(input: HTMLInputElement) {
    this._autocomplete = new google.maps.places.Autocomplete(input, { componentRestrictions: { country: supportedCountries[0] } })
  }

  public render() {
    return (
      <div style={styles.root}>
        <div style={styles.inputContainer}>
          <input ref={this.setAutocomplete} placeholder={this.props.title} style={styles.input} onKeyPress={this._onRouteEnter} />
        </div>
      </div>
    )
  }
}
