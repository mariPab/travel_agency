/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }
  if (filters.duration.from) {
    output = output.filter(trip => (trip.days >= filters.duration.from));
  }
  if (filters.duration.to) {
    output = output.filter(trip => (trip.days <= filters.duration.to));
  }
  // TODO - filter by tags
  if (filters.tags){
    output = output.filter(trip => {
      for (let tag of filters.tags) {
        if(!trip.tags.includes(tag)) return false;
      }
      return true;
    });
  }
  // TODO - sort by cost descending (most expensive goes first)

  return output;
};

export const getTripById = ({trips}, tripId) => {
  // Filter trips by tripId
  const filtered = trips.filter(trip => trip.id == tripId);


  console.log('filtering trips by tripId:', tripId, filtered);
  return filtered.length ? filtered[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  // Filter trips by countryCode
  const filtered = trips.filter(trip => trip.country.code == countryCode);


  console.log('filtering trips by countryCode:', countryCode, filtered);
  return filtered.length ? filtered : [{error: true}];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
