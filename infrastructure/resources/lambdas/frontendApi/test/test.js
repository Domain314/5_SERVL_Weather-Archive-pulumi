const FAKE_DATA = {
    rows: [
        {
            id: 1,
            photoName: 'photo1',
            city: 'test',
            temperature: 20.5,
            humidity: 50,
            air_pressure: 1013,
            datetime: '2024-01-20T08:00:00'
        },
        {
            id: 2,
            photoName: 'photo2',
            city: 'test',
            temperature: 22.0,
            humidity: 55,
            air_pressure: 1012,
            datetime: '2024-01-20T09:00:00'
        },
        {
            id: 3,
            photoName: 'photo3',
            city: 'test',
            temperature: 21.0,
            humidity: 52,
            air_pressure: 1014,
            datetime: '2024-01-20T10:00:00'
        }
    ]
}


const FAKE_CITIES = [
    { city: 'CityA' },
    { city: 'CityB' },
    { city: 'CityC' }
]

module.exports = {
    FAKE_DATA,
    FAKE_CITIES
}