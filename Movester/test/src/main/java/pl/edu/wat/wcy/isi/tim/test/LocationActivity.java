package pl.edu.wat.wcy.isi.tim.test;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.Location;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.app.ActivityCompat;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.PendingResult;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.maps.android.SphericalUtil;
import com.google.maps.android.ui.IconGenerator;
import org.json.JSONArray;
import org.json.JSONException;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

/**
 * Created by Ajron on 2017-06-26.
 */
public class LocationActivity extends AppCompatActivity implements SensorEventListener,
        LocationListener,
        GoogleApiClient.ConnectionCallbacks,
        GoogleApiClient.OnConnectionFailedListener {

    private SensorManager mSensorManager;
    private Sensor mSensor;
    private boolean isSensorPresent = false;
    private TextView mStepsSinceReboot;

    private static final String TAG = "LocationActivity";
    private static final long INTERVAL = 1000 * 10 * 1; //1000*60*1 = 1 minute
    private static final long FASTEST_INTERVAL = 1000 * 10 * 1; // -||-
    Button btnFusedLocation;
    TextView tvLocation;
    LocationRequest mLocationRequest;
    GoogleApiClient mGoogleApiClient;
    Location mCurrentLocation;
    String mLastUpdateTime;
    GoogleMap googleMap;

    String s1, s2, s3, s4, s5, s6, s7, s8, s = null;

    LatLng previous;
    LatLng next;

    double step = 0.0;
    double total = 0.0;

    long prev = 0;
    long timeZero = 0;
    long totalTime = 0;
    long stepTime = 0;

    JSONArray json = null;
    String jsonString = null;

    double stepSpeed = 0.0;
    static double topSpeed = 0.0;
    double avgSpeed = 0.0;

    private DrawerLayout mDrawer;
    private Toolbar toolbar;
    private NavigationView nvDrawer;

    int steps = 0;
    int calories = 0;

    // Make sure to be using android.support.v7.app.ActionBarDrawerToggle version.
    // The android.support.v4.app.ActionBarDrawerToggle has been deprecated.
    private ActionBarDrawerToggle drawerToggle;

    public void onEndClick(View view){
//        TextView begDatView = (TextView) findViewById(R.id.textView18);
//        TextView totalTimeView = (TextView) findViewById(R.id.textView26);
//        TextView distanceView = (TextView) findViewById(R.id.textView27);
//        //if(getText(R.id.textView28) == "Number of steps"){
//            TextView stepsView = (TextView) findViewById(R.id.textView28);
//        //}
//        TextView calsView= (TextView) findViewById(R.id.textView29);
//        TextView avgSpeedView = (TextView) findViewById(R.id.textView30);
//        TextView topSpeedView = (TextView) findViewById(R.id.textView31);



//        begDatView.setText((new Date(timeZero))+"", TextView.BufferType.EDITABLE);
//        totalTimeView.setText((TimeUnit.MILLISECONDS.toMinutes(totalTime))+"", TextView.BufferType.EDITABLE);
//        distanceView.setText(total+"", TextView.BufferType.EDITABLE);
//        stepsView.setText(steps+"", TextView.BufferType.EDITABLE);
//        calsView.setText(calories+"", TextView.BufferType.EDITABLE);
//        avgSpeedView.setText(avgSpeed+"", TextView.BufferType.EDITABLE);
//        topSpeedView.setText(topSpeed+"", TextView.BufferType.EDITABLE);


        //id_record, count_step, distance
        //s1, steps, total
        String xs = s1+ "&count_step=" + steps + "&distance=" + total;
        AsyncTask<String, Integer, String> task = new UploadTask();
        task.execute(TestLogingActivity.web, "/record/close", xs);

        Intent i = new Intent(getApplicationContext(), TestMeasuringActivity.class);
        startActivity(i);
    }

    protected void createLocationRequest() {
        mLocationRequest = new LocationRequest();
        mLocationRequest.setInterval(INTERVAL);
        mLocationRequest.setFastestInterval(FASTEST_INTERVAL);
        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate ...............................");
        //show error dialog if GoolglePlayServices not available
        if (!isGooglePlayServicesAvailable()) {
            finish();
        }
        createLocationRequest();
        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addApi(LocationServices.API)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .build();

        setContentView(R.layout.activity_location_google_map);
        SupportMapFragment fm = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        googleMap = fm.getMap();
        googleMap.getUiSettings().setZoomControlsEnabled(true);

        // Set a Toolbar to replace the ActionBar.
        toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // Find our drawer view
        mDrawer = (DrawerLayout) findViewById(R.id.drawer_layout);

        // Find our drawer view
        nvDrawer = (NavigationView) findViewById(R.id.nvView);
        // Setup drawer view
        setupDrawerContent(nvDrawer);

        mStepsSinceReboot = (TextView)findViewById(R.id.textView28);

        mSensorManager = (SensorManager)
                this.getSystemService(Context.SENSOR_SERVICE);
        if(mSensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)
                != null)
        {
            mSensor =
                    mSensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);
            isSensorPresent = true;
        }
        else
        {
            isSensorPresent = false;
        }
    }

    @Override
    public void onStart() {
        super.onStart();
        Log.d(TAG, "onStart fired ..............");
        mGoogleApiClient.connect();
    }

    @Override
    public void onStop() {
        super.onStop();
        Log.d(TAG, "onStop fired ..............");
        mGoogleApiClient.disconnect();
        Log.d(TAG, "isConnected ...............: " + mGoogleApiClient.isConnected());
    }

    private boolean isGooglePlayServicesAvailable() {
        GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(this);
        return true;
//        int status = 0;
//        status = GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(this);
//        Log.d(TAG, "Status of GooglePlayServices '" + status + "' ConnectionResult: '"+ConnectionResult.SUCCESS+"' equal?='"+(status==ConnectionResult.SUCCESS)+"'");
//        if(status==ConnectionResult.SUCCESS){
//            return true;
//        } else {
//            GoogleApiAvailability.getInstance().getErrorDialog(this, status, 0).show();
//            return false;
//        }
    }

    @Override
    public void onConnected(Bundle bundle) {
        Log.d(TAG, "onConnected - isConnected ...............: " + mGoogleApiClient.isConnected());
        startLocationUpdates();
    }

    protected void startLocationUpdates() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, 0);
//            ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        PendingResult<Status> pendingResult = LocationServices.FusedLocationApi.requestLocationUpdates(
                mGoogleApiClient, mLocationRequest, this);
        Log.d(TAG, "Location update started ..............: ");
    }


    public void onRequestPermissionsResult(int requestCode, String[] permissions,
                                           int[] grantResults) {
        startLocationUpdates();
    }

    @Override
    public void onConnectionSuspended(int i) {

    }

    @Override
    public void onConnectionFailed(ConnectionResult connectionResult) {
        Log.d(TAG, "Connection failed: " + connectionResult.toString());
    }

    @Override
    public void onLocationChanged(Location location) {
        Log.d(TAG, "Firing onLocationChanged..............................................");
        mCurrentLocation = location;
        mLastUpdateTime = DateFormat.getTimeInstance().format(new Date());
        addMarker();
    }

    private void addMarker() {
        MarkerOptions options = new MarkerOptions();

        // following four lines requires 'Google Maps Android API Utility Library'
        // https://developers.google.com/maps/documentation/android/utility/
        // I have used this to display the time as title for location markers
        // you can safely comment the following four lines but for this info

        IconGenerator iconFactory = new IconGenerator(this);
        iconFactory.setStyle(IconGenerator.STYLE_PURPLE);
        options.icon(BitmapDescriptorFactory.fromBitmap(iconFactory.makeIcon(mLastUpdateTime)));
        options.anchor(iconFactory.getAnchorU(), iconFactory.getAnchorV());

        LatLng currentLatLng = new LatLng(mCurrentLocation.getLatitude(), mCurrentLocation.getLongitude());
        options.position(currentLatLng);
        Marker mapMarker = googleMap.addMarker(options);
        long atTime = mCurrentLocation.getTime();
        mLastUpdateTime = DateFormat.getTimeInstance().format(new Date(atTime));
        mapMarker.setTitle(mLastUpdateTime);
        Log.d(TAG, "Marker added.............................");
        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(currentLatLng,
                13));
        Log.d(TAG, "Zoom done.............................");
        next = currentLatLng;
        if(previous == null && next != null){
            timeZero = atTime;
        }
        if(previous != null && next != null) {
            stepTime = Math.abs(atTime - prev);
            stepSpeed = step/(TimeUnit.MILLISECONDS.toSeconds(stepTime));
            step = distance(previous, next);
            total = total + step;
            steps = (int) (steps + (step/0.9));

            AsyncTask<String, Integer, String> task = new DownloadFromUrlTask();
            task.execute(TestLogingActivity.web+"/record/active");
            try {
                jsonString = task.get();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
            json = toJson(jsonString);

            try {
                s1="id_record="+json.getJSONObject(0).getString("id_record");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            s2="&count_step="+steps;
            s3="&time_start="+format.format(prev);
            s4="&latitude_start="+previous.latitude;
            s5="&longitude_start="+previous.longitude;
            s6="&time_end="+format.format(atTime);
            s7="&latitude_end="+next.latitude;
            s8="&longitude_end="+next.longitude;
        }
        prev = atTime;
        totalTime = Math.abs(atTime-timeZero);
        if(stepSpeed>topSpeed) {
            topSpeed = stepSpeed;
        }
        avgSpeed=total/(TimeUnit.MILLISECONDS.toSeconds(totalTime));
        calories = (int) (4*(TimeUnit.MILLISECONDS.toMinutes(totalTime)));
        previous = next;

        Log.d(TAG,"step " + step);
        Log.d(TAG,"total " + total);


        s=s1+s2+s3+s4+s5+s6+s7+s8;
        if(s1 != null && s2 != null && s3 != null && s4 != null && s5 != null && s6 != null && s7 != null && s8 != null) {
            AsyncTask<String, Integer, String> task = new UploadTask();
            task.execute(TestLogingActivity.web, "/record/survey", s);
        }

    }

    private JSONArray toJson(String string) {
        JSONArray obj = null;
        try {
            obj = new JSONArray(string);
            Log.d("My App", obj.toString());
        } catch (Throwable t) {}
        return obj;
    }

    @Override
    protected void onPause() {
        super.onPause();
        stopLocationUpdates();
        if(isSensorPresent)
        {
            mSensorManager.unregisterListener(this);
        }
    }

    protected void stopLocationUpdates() {
        LocationServices.FusedLocationApi.removeLocationUpdates(
                mGoogleApiClient, this);
        Log.d(TAG, "Location update stopped .......................");
    }

    @Override
    public void onResume() {
        super.onResume();
        if (mGoogleApiClient.isConnected()) {
            startLocationUpdates();
            Log.d(TAG, "Location update resumed .....................");
        }
        if(isSensorPresent)
        {
            mSensorManager.registerListener(this, mSensor,
                    SensorManager.SENSOR_DELAY_NORMAL);
        }
    }

    private void setupDrawerContent(NavigationView navigationView) {
        navigationView.setNavigationItemSelectedListener(
                new NavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(MenuItem menuItem) {
                        selectDrawerItem(menuItem);
                        return true;
                    }
                });
    }

    public void selectDrawerItem(MenuItem menuItem) {
        // Create a new fragment and specify the fragment to show based on nav item clicked
        Intent i = null;
        switch(menuItem.getItemId()) {
            case R.id.nav_zero_fragment:
                i = new Intent(getApplicationContext(), LocationActivity.class);
                break;
            case R.id.nav_first_fragment:
                i = new Intent(getApplicationContext(), TestMeasuringActivity.class);
                break;
            case R.id.nav_first_fragment2:
                i = new Intent(getApplicationContext(), TestLogingActivity.class);
                break;
            case R.id.nav_second_fragment2:
                i = new Intent(getApplicationContext(), TestRegisteringActivity.class);
                break;
            case R.id.nav_third_fragment2:
                i = new Intent(getApplicationContext(), TestAccountManagingActivity.class);
                break;
            default:
                i = new Intent(getApplicationContext(), TestLogingActivity.class);
        }

        try {
            startActivity(i);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Highlight the selected item has been done by NavigationView
        menuItem.setChecked(true);
        // Set action bar title
        setTitle(menuItem.getTitle());
        // Close the navigation drawer
        mDrawer.closeDrawers();
    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // The action bar home/up action should open or close the drawer.
        switch (item.getItemId()) {
            case android.R.id.home:
                mDrawer.openDrawer(GravityCompat.START);
                return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        mStepsSinceReboot.setText(String.valueOf(event.values[0]));
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {

    }

    public double distance(LatLng StartP, LatLng EndP) {
        return SphericalUtil.computeDistanceBetween(StartP, EndP);
    }
}