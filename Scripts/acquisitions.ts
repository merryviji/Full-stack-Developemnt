import Chart from 'chart.js/auto';


document.addEventListener('DOMContentLoaded', async function() {
    const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];


    document.addEventListener('DOMContentLoaded', function() {
        const canvas = document.getElementById('acquisitions');
        if (canvas instanceof HTMLCanvasElement) {
            new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: data.map(row => row.year),
                    datasets: [
                        {
                            label: 'Acquisitions by year',
                            data: data.map(row => row.count)
                        }
                    ]
                }
            });
        } else {
            console.error("Canvas element with id 'acquisitions' not found.");
        }
    });
});
