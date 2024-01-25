// Return fake db data for developing

export const FAKE_CITIES = ["vienna", "berlin", "bern", "paris", "london", "stockholm"];

export const FAKE_DATA = [
    {
        id: 1,
        photoname: 'photo1.jpg',
        photoUrl: 'https://weather-archive-image-upload.s3.amazonaws.com/upload/abc_700x300.webp?AWSAccessKeyId=ASIA2FJ275G4KAHRPO7A&Expires=1705941952&Signature=11uIqZTkAjybOyjdfYspBJ8K4tg%3D&X-Amzn-Trace-Id=Root%3D1-65ae9968-6051115f4cbddd7547a701b8%3BParent%3D3b174de71f53990a%3BSampled%3D0%3BLineage%3D070afdd0%3A0&x-amz-security-token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDD7NnqVX12D61nBl%2FYISRTXWYCqJJ2TsimTXHbCXwkcwIgb64LrGHpK%2FnJLqPievkIyaJ1rs5AyxCoZY4bzv05C3oqhgMIShAAGgw2OTg1OTI3ODI3NzYiDBbnkjORvj%2BxlAeJPCrjAqv7Mi8uYJdhUuUefLS%2FrNdcyVf66fVBkUQL3ilHwp0xewA4x0TjG%2FjyYN9m4a290K2rHm3nbK6aV2yrsAh8m%2FKsGWYQBwfO18CZyFm6lEMXqXiY92lXjrk8S8lyLWWgwXmWo%2BJ23p1oR9u%2FuO5i3yzCAhexmIV2hkGk6fZuGzpRvgd6yhg5raHrRG1GLURb23EOnjXkwQ1KpCPegAL96oPzpyAN1MOSpenN%2FAHXRKCBeakUvPtpeXSDHswbqHtOZYRmHZImKoTui6xFhYGQqykXQoRv%2FHSbeoEoBwfE%2BI0%2FzSLnBQt%2FLpsUoS7SVCmqPYzfdvcb06YibKZfh3E1X0QLXR1Htqp39gaoPgI7xXJcvdAO3Tov190Q0AYBvJIAPTS1NWd6uXMEPH40IhLP0eXOrs6cqeanszbrEyLBNaezesVCLYNTGQI1fytNXnh71bCfa0WP6i%2FjrP758gCICKj54yYw47K6rQY6ngGTd0ZjsVbmOywAK9u5kqPIUzb71Jk7lTyyVCiyhE3rh0P5xcgZkDnQMrXMcTK183Rtao54k4pw1ajqrFuEDKbEjwiXezAS3PVXmCN55hEQKgWPyGRwcmuEr6n%2BrKHF%2FCgfQE2b9w3jYhIlsI9k8LWo6FW31sjr9bdEh1EBOhzb8iLFw5EXR%2B32bomHBs75rPLeSMc2z5OXBTT9b55c0w%3D%3D',
        city: 'bern',
        temperature: 20.5,
        humidity: 50,
        air_pressure: 1013,
        datetime: '2024-01-20T08:00:00'
    },
    {
        id: 2,
        photoname: 'photo2.jpg',
        city: 'bern',
        photoUrl: '',
        temperature: 22.0,
        humidity: 55,
        air_pressure: 1012,
        datetime: '2024-01-20T09:00:00'
    },
    {
        id: 3,
        photoname: 'photo3.jpg',
        city: 'bern',
        photoUrl: 'https://weather-archive-image-upload.s3.amazonaws.com/upload/abc_700x300.webp?AWSAccessKeyId=ASIA2FJ275G4KAHRPO7A&Expires=1705941952&Signature=11uIqZTkAjybOyjdfYspBJ8K4tg%3D&X-Amzn-Trace-Id=Root%3D1-65ae9968-6051115f4cbddd7547a701b8%3BParent%3D3b174de71f53990a%3BSampled%3D0%3BLineage%3D070afdd0%3A0&x-amz-security-token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDD7NnqVX12D61nBl%2FYISRTXWYCqJJ2TsimTXHbCXwkcwIgb64LrGHpK%2FnJLqPievkIyaJ1rs5AyxCoZY4bzv05C3oqhgMIShAAGgw2OTg1OTI3ODI3NzYiDBbnkjORvj%2BxlAeJPCrjAqv7Mi8uYJdhUuUefLS%2FrNdcyVf66fVBkUQL3ilHwp0xewA4x0TjG%2FjyYN9m4a290K2rHm3nbK6aV2yrsAh8m%2FKsGWYQBwfO18CZyFm6lEMXqXiY92lXjrk8S8lyLWWgwXmWo%2BJ23p1oR9u%2FuO5i3yzCAhexmIV2hkGk6fZuGzpRvgd6yhg5raHrRG1GLURb23EOnjXkwQ1KpCPegAL96oPzpyAN1MOSpenN%2FAHXRKCBeakUvPtpeXSDHswbqHtOZYRmHZImKoTui6xFhYGQqykXQoRv%2FHSbeoEoBwfE%2BI0%2FzSLnBQt%2FLpsUoS7SVCmqPYzfdvcb06YibKZfh3E1X0QLXR1Htqp39gaoPgI7xXJcvdAO3Tov190Q0AYBvJIAPTS1NWd6uXMEPH40IhLP0eXOrs6cqeanszbrEyLBNaezesVCLYNTGQI1fytNXnh71bCfa0WP6i%2FjrP758gCICKj54yYw47K6rQY6ngGTd0ZjsVbmOywAK9u5kqPIUzb71Jk7lTyyVCiyhE3rh0P5xcgZkDnQMrXMcTK183Rtao54k4pw1ajqrFuEDKbEjwiXezAS3PVXmCN55hEQKgWPyGRwcmuEr6n%2BrKHF%2FCgfQE2b9w3jYhIlsI9k8LWo6FW31sjr9bdEh1EBOhzb8iLFw5EXR%2B32bomHBs75rPLeSMc2z5OXBTT9b55c0w%3D%3D',
        temperature: 21.0,
        humidity: 52,
        air_pressure: 1014,
        datetime: '2024-01-20T10:00:00'
    }
];