package pl.edu.wat.wcy.isi.tim.movester;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.ActionBarActivity;
import android.view.View;

import static pl.edu.wat.wcy.isi.tim.movester.R.*;

/**
 * Created by Ajron on 2017-05-21.
 */
public class RegisteringActivity extends ActionBarActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(layout.activity_registering);
    }

    public void onRegisterClick(View view) {
    }
}
