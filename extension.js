tableau.extensions.initializeAsync().then(() => {
    const worksheet = tableau.extensions.dashboardContent.dashboard.worksheets[0];
    worksheet.getSummaryDataAsync().then((data) => {
      const heatmapData = data.data.map((row) => ({
        id: row[0].value,  // Assuming the first column contains polygon IDs (e.g., 'polygon1')
        count: row[1].value, // Assuming the second column contains count values
      }));
      updateHeatMap(heatmapData);
    });
  });
  
  function updateHeatMap(data) {
    data.forEach((polygon) => {
      const element = d3.select(`#${polygon.id}`);
      const color = d3.interpolateReds(polygon.count / 100); // Normalize count to range 0-100
      element.style('fill', color);
    });
  }
  