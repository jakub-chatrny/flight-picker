import fetch from 'isomorphic-fetch';
import {SERVER_URL, HEADERS} from './constants';

export default async function (entityName = '', params) {
    try {
        const convertParams = (
            !params ?
                '' :
                '?'.concat(
                    Object
                        .entries(params).map(
                        ([key, val]) => `${key}=${val}`
                    )
                        .join('&')
                )

        );
        return await fetch(
            SERVER_URL + entityName + convertParams,
            {
                method: 'GET',
                headers: HEADERS,
            }
        )
            .then((response) => response.json())
            .then((data) => {
                //console.log(entityName, data);
                return data;
            })
            .catch((error) => error);
    } catch (error) {
        console.error('FETCHING ERROR: ',error);
    }
};