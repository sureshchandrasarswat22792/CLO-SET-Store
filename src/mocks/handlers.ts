
import { http, HttpResponse  } from 'msw';

 export let handlers = [
  http.get('https://closet-recruiting-api.azurewebsites.net/api/data', () => {
    return HttpResponse.json([
        { id: 'content-001', title: 'Yellow green coat', creator: 'Adam', price: 50, pricingOption: '0', imagePath: '...' },
        { id: 'content-002', title: 'Brown Anorak', creator: 'Benny', price: 30, pricingOption: '1', imagePath: '...' },
        { id: 'content-003', title: 'Block shape mini bag', creator: 'Catlin', price: 15, pricingOption: '2', imagePath: '...' },
      ])
  }),
];


