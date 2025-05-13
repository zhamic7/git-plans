// water fountain markers
const imagePath = 'images/icon.png';

export function addMarker(latlng) {
    const el = document.createElement('div');
    el.style.width = '50px';
    el.style.height = '50px';
    el.style.backgroundImage = `url(${imagePath})`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundColor = '#AFAFAF'; // dark grey
    el.style.backgroundPosition = 'center';
    //el.style.borderRadius = '50%';
    el.style.border = '2px solid black';

    const triangle = document.createElement('div');
    triangle.style.position = 'absolute';
    triangle.style.bottom = '48px'; 
    triangle.style.left = '50%';
    triangle.style.width = '0';
    triangle.style.height = '0';
    triangle.style.borderLeft = '10px solid transparent'; 
    triangle.style.borderRight = '10px solid transparent';
    triangle.style.borderTop = '12px solid black'; 
    triangle.style.transform = 'translateX(-50%) rotate(180deg)'; 
    
    el.appendChild(triangle);

    return new maplibregl.Marker({ element: el, offset: [0, 70] })
        .setLngLat([latlng[1], latlng[0]]);
       
}