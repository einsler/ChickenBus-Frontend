import { FeatureCollection, Feature, LineString } from "geojson";

export const examplePersona = {
    secondaryText: 'Traveller',
    primaryText: 'John Doe',
    imageInitials: 'JD',
    imageUrl: 'http://www.backpackerbus.co.nz/wp-content/uploads/backpacker-bus-backpacker-discounts-768x400.jpg'
};

export const APIKey: string = "AIzaSyBUAfME2CHwOHyq4fT9VuMzkm7fIKpWNnY";


export const supportedCountries: string[] = ['NI'];

interface MapIcons {
  origin: google.maps.Icon;
  destination: google.maps.Icon;
}

const iconBaseUrl = '../images/icons/'
const xDim = 420;
const yDim = 500;
const size = new google.maps.Size(xDim, yDim);
const scaledSize = new google.maps.Size(xDim/10, yDim/10);
const anchor = new google.maps.Point(xDim/2, yDim);
const origin = new google.maps.Point(0,0);

export const IconsForMap: MapIcons = {
  origin: {
    url: iconBaseUrl + 'chickenOrigin.svg',
    origin: origin,
    size: size,
    scaledSize: scaledSize,
    anchor: anchor
  },
  destination: {
    url: iconBaseUrl + 'chickenDestination.svg',
    origin: origin,
    size: size,
    scaledSize: scaledSize,
    anchor: anchor
  }
}

/**
  export const exampleBlogItem: IBlogItem[] = [
    {
      title: '10 Great Surfing Spots in Nicaragua',
      text: 'Twelve broken boards at Playa Maderas',
      imgurl: 'https://i.ytimg.com/vi/RA3zhDWgkMU/maxresdefault.jpg'
    },
    {
      title: '10 Great Surfing Spots in Nicaragua',
      text: 'Twelve broken boards at Playa Maderas',
      imgurl: 'https://i.ytimg.com/vi/RA3zhDWgkMU/maxresdefault.jpg'
    },
    {
      title: '10 Great Surfing Spots in Nicaragua',
      text: 'Twelve broken boards at Playa Maderas',
      imgurl: 'https://i.ytimg.com/vi/RA3zhDWgkMU/maxresdefault.jpg'
    },
    {
      title: '10 Great Surfing Spots in Nicaragua',
      text: 'Twelve broken boards at Playa Maderas',
      imgurl: 'https://i.ytimg.com/vi/RA3zhDWgkMU/maxresdefault.jpg'
    },
    {
      title: '10 Great Surfing Spots in Nicaragua',
      text: 'Twelve broken boards at Playa Maderas',
      imgurl: 'https://i.ytimg.com/vi/RA3zhDWgkMU/maxresdefault.jpg'
    }
  ]
  */
