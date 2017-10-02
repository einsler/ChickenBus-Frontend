import { FeatureCollection, Feature, LineString } from "geojson";

export const examplePersona = {
    secondaryText: 'Traveller',
    primaryText: 'John Doe',
    imageInitials: 'JD',
    imageUrl: 'http://www.backpackerbus.co.nz/wp-content/uploads/backpacker-bus-backpacker-discounts-768x400.jpg'
};

export const APIKey: string = "AIzaSyBUAfME2CHwOHyq4fT9VuMzkm7fIKpWNnY";


export const supportedCountries: string[] = ['NI'];

export const sampleGeoJSON: FeatureCollection<LineString> = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -86.4265251159668,
            12.234332470247383
          ],
          [
            -86.42154693603516,
            12.233325891585105
          ],
          [
            -86.37022018432617,
            12.193395181953116
          ],
          [
            -86.36713027954102,
            12.189703804004086
          ],
          [
            -86.3467025756836,
            12.173427570616886
          ],
          [
            -86.34138107299805,
            12.166379819828121
          ],
          [
            -86.33914947509766,
            12.160338741814007
          ],
          [
            -86.33434295654297,
            12.140536468615805
          ],
          [
            -86.32610321044922,
            12.135333932194474
          ],
          [
            -86.32043838500975,
            12.13281653939173
          ],
          [
            -86.3170051574707,
            12.131977403173144
          ],
          [
            -86.3137435913086,
            12.132313057977614
          ],
          [
            -86.31134033203125,
            12.129459978666885
          ],
          [
            -86.3082504272461,
            12.137347829313109
          ],
          [
            -86.29829406738281,
            12.13919388829849
          ],
          [
            -86.28284454345703,
            12.151109052059805
          ]
        ]
      }
    }
  ]
}