package pl.edu.wat.wcy.isi.tim.test;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;
import org.json.JSONException;

import java.util.concurrent.ExecutionException;

/**
 * Created by Ajron on 2017-06-24.
 */
public class TestMeasuringActivity  extends AppCompatActivity {
    private DrawerLayout mDrawer;
    private Toolbar toolbar;
    private NavigationView nvDrawer;

    // Make sure to be using android.support.v7.app.ActionBarDrawerToggle version.
    // The android.support.v4.app.ActionBarDrawerToggle has been deprecated.
    private ActionBarDrawerToggle drawerToggle;

    /*
    String web = "http://172.23.242.190:3001/user/data?id=0";

    String jsonString = null;
    JSONObject json = null;

    String text1 = null;
    String text2 = null;
    String text3 = null;

    private JSONObject toJson(String string) {
        JSONObject obj = null;
        try {
            obj = new JSONObject(string);
            Log.d("My App", obj.toString());
        } catch (Throwable t) {}
        return obj;
    }
    */
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_measuring);

        // Set a Toolbar to replace the ActionBar.
        toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // Find our drawer view
        mDrawer = (DrawerLayout) findViewById(R.id.drawer_layout);

        // Find our drawer view
        nvDrawer = (NavigationView) findViewById(R.id.nvView);
        // Setup drawer view
        setupDrawerContent(nvDrawer);
    }

    public void onStartMeasuringClick(View view) throws ExecutionException, InterruptedException, JSONException {
        //uruchamianie Location

        /*AsyncTask<String, Integer, String> task = new DownloadFromUrlTask();
        task.execute(web);
        jsonString = task.get();

        json = toJson(jsonString);

        JSONArray jsonArray = new JSONArray(jsonString);

        JSONObject jsonObject = jsonArray.getJSONObject(0);
        text1 = jsonObject.getString("id_user");
        text2 = jsonObject.getString("login");
        text3 = jsonObject.getString("first_name");

        //text1 = json.optString("id_user");
        //text2 = json.optString("login");
        //text3 = json.optString("password");

        TextView textView1 = (TextView) findViewById(R.id.textView19);
        textView1.setText(text1, TextView.BufferType.EDITABLE);

        TextView textView2 = (TextView) findViewById(R.id.textView18);
        textView2.setText(text2, TextView.BufferType.EDITABLE);

        TextView textView3 = (TextView) findViewById(R.id.textView21);
        textView3.setText(text3, TextView.BufferType.EDITABLE);
*/
        Intent i = new Intent(getApplicationContext(), LocationActivity.class);
        startActivity(i);
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
}
