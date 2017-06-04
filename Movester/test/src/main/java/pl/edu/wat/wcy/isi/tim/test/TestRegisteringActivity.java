package pl.edu.wat.wcy.isi.tim.test;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.ActionBarActivity;
import android.view.View;

import java.util.concurrent.ExecutionException;

import static pl.edu.wat.wcy.isi.tim.test.R.layout;

/**
 * Created by Ajron on 2017-05-21.
 */
public class TestRegisteringActivity extends ActionBarActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(layout.activity_test_registering);
    }

    public void onRegisterClick(View view) throws ExecutionException, InterruptedException {

    }
}
