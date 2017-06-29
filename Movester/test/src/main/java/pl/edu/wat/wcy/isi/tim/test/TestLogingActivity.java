package pl.edu.wat.wcy.isi.tim.test;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.concurrent.ExecutionException;

/**
 * Created by Ajron on 2017-06-24.
 */
public class TestLogingActivity extends AppCompatActivity {
    private DrawerLayout mDrawer;
    private Toolbar toolbar;
    private NavigationView nvDrawer;

    // Make sure to be using android.support.v7.app.ActionBarDrawerToggle version.
    // The android.support.v4.app.ActionBarDrawerToggle has been deprecated.
    private ActionBarDrawerToggle drawerToggle;
    static String web = "http://192.168.8.104:3001";

    String jsonString = null;
    JSONObject json = null;

    static String text1 = null;
    static String text2 = null;

    String entrance = null;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_loging);

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

    public void onLogInClick(View view) throws ExecutionException, InterruptedException, JSONException {
        EditText edit1 = (EditText) findViewById(R.id.editText3);
        EditText edit2 = (EditText) findViewById(R.id.editText4);
        entrance = "login="+edit1.getText().toString()+"&password="+edit2.getText().toString();

        AsyncTask<String, Integer, String> task = new DownloadTokenTask();
        task.execute(web, entrance);
        jsonString = task.get();

        json = toJson(jsonString);
        text1 = json.getJSONObject("body").getString("id");
        text2 = json.getJSONObject("body").getString("token");

//        TextView textView3 = (TextView) findViewById(R.id.textView3);
//        textView3.setText(text2, TextView.BufferType.EDITABLE);
        Intent i = new Intent(getApplicationContext(), TestAccountManagingActivity.class);
        startActivity(i);
    }

    private JSONObject toJson(String string) {
        JSONObject obj = null;
        try {
            obj = new JSONObject(string);
            Log.d("My App", obj.toString());
        } catch (Throwable t) {}
        return obj;
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
