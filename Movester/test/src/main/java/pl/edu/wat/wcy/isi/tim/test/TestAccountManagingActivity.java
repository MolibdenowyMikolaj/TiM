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
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;

/**
 * Created by Ajron on 2017-05-21.
 */
public class TestAccountManagingActivity extends AppCompatActivity {
    private DrawerLayout mDrawer;
    private Toolbar toolbar;
    private NavigationView nvDrawer;

    // Make sure to be using android.support.v7.app.ActionBarDrawerToggle version.
    // The android.support.v4.app.ActionBarDrawerToggle has been deprecated.
    private ActionBarDrawerToggle drawerToggle;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_account_managing);

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

    public void onUpdateAccountInformationsClick(View view) {
        EditText edit1 = (EditText) findViewById(R.id.editText14);
        EditText edit2 = (EditText) findViewById(R.id.editText9);
        EditText edit3 = (EditText) findViewById(R.id.editText12);
        EditText edit4 = (EditText) findViewById(R.id.editText13);
        EditText edit5 = (EditText) findViewById(R.id.editText11);
        EditText edit6 = (EditText) findViewById(R.id.editText8);

        String s1="&login="+edit1.getText().toString();
        String s2="&password="+edit2.getText().toString();
        String s3="&first_name="+edit3.getText().toString();
        String s4="&last_name="+edit4.getText().toString();
        String s5="&e_mail="+edit5.getText().toString();
        String s6="&confirmation_password="+edit6.getText().toString();
        String s=s1+s2+s3+s4+s5+s6;

        AsyncTask<String, Integer, String> task = new UploadTask();
        task.execute(TestLogingActivity.web, "/user/update", s);

//        TextView textView3 = (TextView) findViewById(R.id.textView3);
//        textView3.setText(text2, TextView.BufferType.EDITABLE);
        TestLogingActivity.text1 = null;
        TestLogingActivity.text2 = null;

        Intent i = new Intent(getApplicationContext(), TestLogingActivity.class);
        startActivity(i);
    }

    public void onLogOutClick(View view) {
        //wylogowanie
        TestLogingActivity.text1 = null;
        TestLogingActivity.text2 = null;

        Intent i = new Intent(getApplicationContext(), TestLogingActivity.class);
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
